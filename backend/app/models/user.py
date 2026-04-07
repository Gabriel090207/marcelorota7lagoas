from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class User(BaseModel):
    nome: str
    email: str
    telefone: Optional[str] = ""
    senha: str

    createdAt: Optional[datetime] = datetime.now()