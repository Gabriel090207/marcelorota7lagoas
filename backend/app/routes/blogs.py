from fastapi import APIRouter
from app.models.blog import Blog
from app.services.firebase import db

router = APIRouter(prefix="/blogs", tags=["Blogs"])


@router.get("/")
def listar_blogs():
    blogs_ref = db.collection("blogs").stream()

    lista = []

    for doc in blogs_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


@router.post("/")
def criar_blog(blog: Blog):
    db.collection("blogs").add(blog.dict())
    return {"msg": "Blog criado com sucesso"}


@router.get("/{id}")
def buscar_blog(id: str):
    doc_ref = db.collection("blogs").document(id).get()

    if not doc_ref.exists:
        return {"erro": "Blog não encontrado"}

    data = doc_ref.to_dict()
    data["id"] = doc_ref.id

    return data


@router.put("/{id}")
def atualizar_blog(id: str, blog: Blog):
    doc_ref = db.collection("blogs").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Blog não encontrado"}

    doc_ref.update(blog.dict())

    return {"msg": "Blog atualizado com sucesso"}


@router.delete("/{id}")
def deletar_blog(id: str):
    doc_ref = db.collection("blogs").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Blog não encontrado"}

    doc_ref.delete()

    return {"msg": "Blog deletado com sucesso"}