from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Servico(Base):
    __tablename__ = "servicos"

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    preco = Column(Float, nullable=False)
    duracao_minutos = Column(Integer)