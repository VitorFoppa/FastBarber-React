from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)

    cliente_id = Column(Integer, ForeignKey("clientes.id"))
    barbeiro_id = Column(Integer, ForeignKey("barbeiros.id"))
    servico_id = Column(Integer, ForeignKey("servicos.id"))

    data_hora = Column(DateTime, nullable=False)
    status = Column(String, default="agendado")

    cliente = relationship("Cliente")
    barbeiro = relationship("Barbeiro")
    servico = relationship("Servico")