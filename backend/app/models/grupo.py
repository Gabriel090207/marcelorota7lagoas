from pydantic import BaseModel

class Grupo(BaseModel):
    nome: str
    tipo: str
    link: str
    imagem: str = ""
    descricao: str = ""