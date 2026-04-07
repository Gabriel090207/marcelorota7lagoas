from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Comentario(BaseModel):
    blogId: str
    userId: str
    nome: str
    comentario: str

    createdAt: Optional[datetime] = datetime.now()