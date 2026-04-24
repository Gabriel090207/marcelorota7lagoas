from pydantic import BaseModel

class Imagem(BaseModel):
    titulo: str = ""
    subtitulo: str = ""
    legenda: str = ""
    categoria: str
    url: str