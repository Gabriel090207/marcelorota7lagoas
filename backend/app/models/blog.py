from pydantic import BaseModel
from typing import List, Optional

class Blog(BaseModel):
    titulo: str
    conteudo: str
    categoria: Optional[str] = ""
    imagem: Optional[str] = ""
    imagens: Optional[List[str]] = []
    autor: Optional[str] = ""