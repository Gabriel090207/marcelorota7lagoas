from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class Noticia(BaseModel):
    titulo: str
    conteudo: str
    imagem: Optional[str] = None
    imagens: Optional[List[str]] = []
    legendaCapa: Optional[str] = None
    legendas: Optional[List[str]] = []
    categoria: Optional[str] = None
    autor: Optional[str] = "Admin"
    data: Optional[datetime] = datetime.now()

    # 🔥 NOVO CAMPO
    slug: Optional[str] = None