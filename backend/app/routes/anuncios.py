from fastapi import APIRouter
from app.models.anuncio import Anuncio
from app.services.firebase import db

router = APIRouter(prefix="/anuncios", tags=["Anuncios"])


@router.get("/")
def listar_anuncios():
    anuncios_ref = db.collection("anuncios").stream()

    lista = []

    for doc in anuncios_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


import time

@router.post("/")
def criar_anuncio(anuncio: Anuncio):
    data = anuncio.dict()
    data["created_at"] = time.time()

    db.collection("anuncios").add(data)

    return {"msg": "Anúncio criado com sucesso"}


@router.get("/{id}")
def buscar_anuncio(id: str):
    doc_ref = db.collection("anuncios").document(id).get()

    if not doc_ref.exists:
        return {"erro": "Anúncio não encontrado"}

    data = doc_ref.to_dict()
    data["id"] = doc_ref.id

    return data


@router.put("/{id}")
def atualizar_anuncio(id: str, anuncio: Anuncio):
    doc_ref = db.collection("anuncios").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Anúncio não encontrado"}

    doc_ref.update(anuncio.dict())

    return {"msg": "Anúncio atualizado com sucesso"}


@router.delete("/{id}")
def deletar_anuncio(id: str):
    doc_ref = db.collection("anuncios").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Anúncio não encontrado"}

    doc_ref.delete()

    return {"msg": "Anúncio deletado com sucesso"}