from pydantic import BaseModel

class Anuncio(BaseModel):
    titulo: str
    tipo: str
    preco: str
    telefone: str
    descricao: str
    imagem: str = ""