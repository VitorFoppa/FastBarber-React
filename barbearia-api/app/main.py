from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes import agendamento, cliente, barbeiro, servico
from app.models.agendamento import Agendamento

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois podemos restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cliente.router, prefix="/clientes", tags=["Clientes"])
app.include_router(barbeiro.router, prefix="/barbeiros", tags=["Barbeiros"])
app.include_router(servico.router, prefix="/servicos", tags=["Serviços"])
app.include_router(agendamento.router, prefix="/agendamentos", tags=["Agendamentos"])


@app.get("/")
def root():
    return {"message": "API Barbearia funcionando"}