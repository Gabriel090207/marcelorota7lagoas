from fastapi import APIRouter
from app.models.comentario import Comentario
from app.services.firebase import db

router = APIRouter(prefix="/comentarios", tags=["Comentários"])


# 🔹 LISTAR por blog
@router.get("/{blogId}")
def listar_comentarios(blogId: str):
    comentarios_ref = db.collection("comentarios").stream()

    lista = []

    for doc in comentarios_ref:
        data = doc.to_dict()

        if data.get("blogId") == blogId:
            data["id"] = doc.id
            lista.append(data)

    return lista


# 🔹 CRIAR
@router.post("/")
def criar_comentario(comentario: Comentario):

    data = comentario.dict()
    data["createdAt"] = comentario.createdAt.isoformat()

    doc_ref = db.collection("comentarios").add(data)

    data["id"] = doc_ref[1].id

    return data


@router.delete("/{id}")
def deletar_comentario(id: str):
    doc_ref = db.collection("comentarios").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Comentário não encontrado"}

    doc_ref.delete()

    return {"msg": "Comentário deletado"}