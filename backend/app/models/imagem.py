from pydantic import BaseModel

class Imagem(BaseModel):
    titulo: str = ""
    categoria: str
    url: str