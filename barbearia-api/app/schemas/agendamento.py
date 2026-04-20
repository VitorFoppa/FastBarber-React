from pydantic import BaseModel
from datetime import datetime
# Importe os outros schemas (ajuste os caminhos se necessário)
from app.schemas.cliente import ClienteResponse
from app.schemas.barbeiro import BarbeiroResponse
from app.schemas.servico import ServicoResponse

class AgendamentoCreate(BaseModel):
    cliente_id: int
    barbeiro_id: int
    servico_id: int
    data_hora: datetime
    status: str = "agendado"

class AgendamentoResponse(BaseModel):
    id: int
    data_hora: datetime
    status: str
    
    # Aqui está o segredo: trocamos o "int" pelo schema completo
    cliente: ClienteResponse
    barbeiro: BarbeiroResponse
    servico: ServicoResponse

    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    total_agendamentos: int
    faturamento_previsto: float
    agendamentos: list[AgendamentoResponse] 

    class Config:
        from_attributes = True