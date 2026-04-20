from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.agendamento import Agendamento
from app.models.servico import Servico

def horario_disponivel(db: Session, barbeiro_id: int, data_hora, servico_id: int):

    servico = db.query(Servico).get(servico_id)
    duracao = timedelta(minutes=servico.duracao_minutos)

    inicio_novo = data_hora
    fim_novo = data_hora + duracao

    agendamentos = db.query(Agendamento).filter(
        Agendamento.barbeiro_id == barbeiro_id
    ).all()

    for ag in agendamentos:
        inicio_existente = ag.data_hora

        servico_existente = db.query(Servico).get(ag.servico_id)
        fim_existente = inicio_existente + timedelta(minutes=servico_existente.duracao_minutos)

        if (inicio_novo < fim_existente) and (fim_novo > inicio_existente):
            return False

    return True

def gerar_horarios_disponiveis(db: Session, barbeiro_id: int, data: datetime, servico_id: int):

    horarios = []

    inicio_dia = data.replace(hour=8, minute=0, second=0)
    fim_dia = data.replace(hour=18, minute=0, second=0)

    intervalo = timedelta(minutes=30)

    atual = inicio_dia

    while atual < fim_dia:

        if horario_disponivel(db, barbeiro_id, atual, servico_id):
            horarios.append(atual)

        atual += intervalo

    return horarios