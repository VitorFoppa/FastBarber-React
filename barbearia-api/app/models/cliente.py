from sqlalchemy import Column, Integer, String
from app.database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    email = Column(String, unique=True)
    senha = Column(String)
    telefone = Column(String, nullable=False)