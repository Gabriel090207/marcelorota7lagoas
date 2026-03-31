from fastapi import APIRouter, BackgroundTasks
from app.models.blog import Blog
from app.services.firebase import db
from app.services.email_scheduler import schedule_blog_email

router = APIRouter(prefix="/blogs", tags=["Blogs"])


def get_all_subscribers():
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    return [User(doc.to_dict().get("email")) for doc in docs]


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

    doc_ref = db.collection("blogs").add(blog.dict())
    blog_id = doc_ref[1].id

    title = blog.titulo if hasattr(blog, "titulo") else "Novo blog"
    description = blog.conteudo if hasattr(blog, "conteudo") else ""
    url = f"https://www.rota7lagoas.com.br/blog/{blog_id}"

    import time

    db.collection("email_queue").add({
        "tipo": "blog",
        "title": title,
        "description": description,
        "url": url,
        "status": "pendente",
        "created_at": time.time()
    })

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