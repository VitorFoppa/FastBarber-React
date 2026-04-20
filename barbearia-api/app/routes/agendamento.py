from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, timedelta  
from sqlalchemy import func

from app.database import get_db
from app import models
from app.schemas.agendamento import AgendamentoCreate, AgendamentoResponse, DashboardResponse

router = APIRouter()

@router.post("/", response_model=AgendamentoResponse)
def criar_agendamento(
    dados: AgendamentoCreate,
    db: Session = Depends(get_db)
):
    servico = db.query(models.Servico).filter(
        models.Servico.id == dados.servico_id
    ).first()

    if not servico:
        raise HTTPException(
            status_code=404,
            detail="Serviço não encontrado."
        )

    novo_inicio = dados.data_hora
    novo_fim = novo_inicio + timedelta(minutes=servico.duracao_minutos)

    agendamentos_existentes = db.query(models.Agendamento).filter(
        models.Agendamento.barbeiro_id == dados.barbeiro_id,
        models.Agendamento.status != "cancelado"
    ).all()

    for ag in agendamentos_existentes:
        inicio_existente = ag.data_hora
        fim_existente = inicio_existente + timedelta(
            minutes=ag.servico.duracao_minutos
        )

        if novo_inicio < fim_existente and novo_fim > inicio_existente:
            raise HTTPException(
                status_code=400,
                detail="Este barbeiro já possui atendimento neste intervalo de horário."
            )

    agendamento = models.Agendamento(
        cliente_id=dados.cliente_id,
        barbeiro_id=dados.barbeiro_id,
        servico_id=dados.servico_id,
        data_hora=dados.data_hora,
        status=dados.status
    )

    db.add(agendamento)
    db.commit()
    db.refresh(agendamento)

    return agendamento

@router.get("/", response_model=list[AgendamentoResponse])
def listar_agendamentos(db: Session = Depends(get_db)):
    return db.query(models.Agendamento).all()

@router.delete("/{agendamento_id}")
def deletar_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db)
):
    agendamento = db.query(models.Agendamento).filter(
        models.Agendamento.id == agendamento_id
    ).first()

    if not agendamento:
        raise HTTPException(
            status_code=404,
            detail="Agendamento não encontrado."
        )

    db.delete(agendamento)
    db.commit()

    return {"message": "Agendamento deletado com sucesso."}

@router.get("/dashboard/hoje", response_model=DashboardResponse) 
def resumo_hoje(db: Session = Depends(get_db)):
    hoje = date.today()
    
    from sqlalchemy.orm import joinedload
    
    agendamentos = db.query(models.Agendamento).options(
        joinedload(models.Agendamento.cliente),
        joinedload(models.Agendamento.barbeiro),
        joinedload(models.Agendamento.servico)
    ).filter(
        func.date(models.Agendamento.data_hora) == hoje
    ).all()
    
    faturamento_previsto = sum(a.servico.preco for a in agendamentos if a.status != "cancelado")
    
    return {
        "total_agendamentos": len(agendamentos),
        "faturamento_previsto": faturamento_previsto,
        "agendamentos": agendamentos
    }