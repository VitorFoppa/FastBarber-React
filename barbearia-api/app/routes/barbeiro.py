from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.barbeiro import Barbeiro
from app.schemas.barbeiro import BarbeiroCreate, BarbeiroResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=BarbeiroResponse)
def criar_barbeiro(dados: BarbeiroCreate, db: Session = Depends(get_db)):
    barbeiro = Barbeiro(nome=dados.nome)
    db.add(barbeiro)
    db.commit()
    db.refresh(barbeiro)
    return barbeiro

@router.get("/", response_model=list[BarbeiroResponse])
def listar_barbeiros(db: Session = Depends(get_db)):
    return db.query(Barbeiro).all()

@router.delete("/{barbeiro_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_barbeiro(barbeiro_id: int, db: Session = Depends(get_db)):

    barbeiro = db.query(Barbeiro).filter(Barbeiro.id == barbeiro_id).first()

    if not barbeiro:
        raise HTTPException(status_code=404, detail="Barbeiro não encontrado")

    db.delete(barbeiro)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)