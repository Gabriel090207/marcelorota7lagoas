from fastapi import APIRouter
from app.models.noticia import Noticia
from app.services.firebase import db

router = APIRouter(prefix="/noticias", tags=["Noticias"])

@router.get("/")
def listar_noticias():
    noticias_ref = db.collection("noticias").stream()

    lista = []

    for doc in noticias_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista

@router.post("/")
def criar_noticia(noticia: Noticia):
    db.collection("noticias").add(noticia.dict())
    return {"msg": "Notícia criada com sucesso"}


@router.get("/{id}")
def buscar_noticia(id: str):
    doc_ref = db.collection("noticias").document(id).get()

    if not doc_ref.exists:
        return {"erro": "Notícia não encontrada"}

    data = doc_ref.to_dict()
    data["id"] = doc_ref.id

    return data


@router.put("/{id}")
def atualizar_noticia(id: str, noticia: Noticia):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    doc_ref.update(noticia.dict())

    return {"msg": "Notícia atualizada com sucesso"}



@router.delete("/{id}")
def deletar_noticia(id: str):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    doc_ref.delete()

    return {"msg": "Notícia deletada com sucesso"}