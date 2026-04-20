from sqlalchemy import Column, Integer, String
from app.database import Base

class Barbeiro(Base):
    __tablename__ = "barbeiros"

    id = Column(Integer, primary_key=True)
    nome = Column(String)