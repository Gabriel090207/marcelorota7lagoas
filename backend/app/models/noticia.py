from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Noticia(BaseModel):
    titulo: str
    conteudo: str
    imagem: Optional[str] = None
    categoria: Optional[str] = None
    autor: Optional[str] = "Admin"
    data: Optional[datetime] = datetime.now()