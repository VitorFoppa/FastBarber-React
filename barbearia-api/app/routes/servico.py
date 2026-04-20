from fastapi import APIRouter, Depends, Response, status, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.servico import Servico
from app.schemas.servico import ServicoCreate, ServicoResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ServicoResponse)
def criar_servico(dados: ServicoCreate, db: Session = Depends(get_db)):
    servico = Servico(
        nome=dados.nome,
        preco=dados.preco,
        duracao_minutos=dados.duracao_minutos
    )
    db.add(servico)
    db.commit()
    db.refresh(servico)
    return servico

@router.get("/", response_model=list[ServicoResponse])
def listar_servicos(db: Session = Depends(get_db)):
    return db.query(Servico).all()

@router.delete("/{servico_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_servico(servico_id: int, db: Session = Depends(get_db)):

    servico = db.query(Servico).filter(Servico.id == servico_id).first()

    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")

    db.delete(servico)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)