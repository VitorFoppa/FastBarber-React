from pydantic import BaseModel, EmailStr


class ClienteCreate(BaseModel):
    nome: str
    email: EmailStr
    telefone: str
    senha: str


class ClienteResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    telefone: str

    class Config:
        from_attributes = True