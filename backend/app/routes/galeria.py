from fastapi import APIRouter
from app.models.imagem import Imagem
from app.services.firebase import db

router = APIRouter(prefix="/galeria", tags=["Galeria"])


@router.get("/")
def listar_imagens():
    docs = db.collection("galeria").stream()

    lista = []

    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


@router.post("/")
def criar_imagem(imagem: Imagem):
    db.collection("galeria").add(imagem.dict())
    return {"msg": "Imagem criada com sucesso"}


@router.delete("/{id}")
def deletar_imagem(id: str):
    doc_ref = db.collection("galeria").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Imagem não encontrada"}

    doc_ref.delete()

    return {"msg": "Imagem deletada com sucesso"}