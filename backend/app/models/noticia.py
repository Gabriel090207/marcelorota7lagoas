from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


from datetime import datetime
from pydantic import Field

class Noticia(BaseModel):
    titulo: str
    conteudo: str
    imagem: Optional[str] = None
    videoLink: Optional[str] = None
    videoArquivo: Optional[str] = None
    imagens: Optional[List[str]] = []
    legendaCapa: Optional[str] = None
    legendas: Optional[List[str]] = []
    categoria: Optional[str] = None
    autor: Optional[str] = "Admin"
    
    data: Optional[datetime] = None
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class Noticia(BaseModel):
    titulo: str
    conteudo: str

    imagem: Optional[str] = None
    imagens: Optional[List[str]] = []

    videoLink: Optional[str] = None
    videoArquivo: Optional[List[str]] = []

    legendaCapa: Optional[str] = None
    legendas: Optional[List[str]] = []

    legendaVideo: Optional[str] = None
    legendasVideos: Optional[List[str]] = []

    categoria: Optional[str] = None
    autor: Optional[str] = "Admin"

    data: Optional[datetime] = None
    slug: Optional[str] = None
    # 🔥 NOVO CAMPO
    slug: Optional[str] = None