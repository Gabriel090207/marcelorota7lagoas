from fastapi import APIRouter
from app.models.grupo import Grupo
from app.services.firebase import db

router = APIRouter(prefix="/grupos", tags=["Grupos"])


@router.get("/")
def listar_grupos():
    grupos_ref = db.collection("grupos").stream()

    lista = []

    for doc in grupos_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


@router.post("/")
def criar_grupo(grupo: Grupo):
    db.collection("grupos").add(grupo.dict())
    return {"msg": "Grupo criado com sucesso"}


@router.get("/{id}")
def buscar_grupo(id: str):
    doc_ref = db.collection("grupos").document(id).get()

    if not doc_ref.exists:
        return {"erro": "Grupo não encontrado"}

    data = doc_ref.to_dict()
    data["id"] = doc_ref.id

    return data


@router.put("/{id}")
def atualizar_grupo(id: str, grupo: Grupo):
    doc_ref = db.collection("grupos").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Grupo não encontrado"}

    doc_ref.update(grupo.dict())

    return {"msg": "Grupo atualizado com sucesso"}


@router.delete("/{id}")
def deletar_grupo(id: str):
    doc_ref = db.collection("grupos").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Grupo não encontrado"}

    doc_ref.delete()

    return {"msg": "Grupo deletado com sucesso"}