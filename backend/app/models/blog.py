from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Blog(BaseModel):
    titulo: str
    conteudo: str
    categoria: Optional[str] = ""
    imagem: Optional[str] = ""
    imagens: Optional[List[str]] = []
    legendaCapa: Optional[str] = None
    legendas: Optional[List[str]] = []
    autor: Optional[str] = ""
    
    data: Optional[datetime] = None
    slug: Optional[str] = None