from fastapi import APIRouter, BackgroundTasks
from app.services.email_scheduler import schedule_news_email
from app.models.noticia import Noticia
from app.services.firebase import db

# ✅ Router (TEM que vir antes de usar @router)
router = APIRouter(prefix="/noticias", tags=["Noticias"])


# 🔹 Buscar emails inscritos
def get_all_subscribers():
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    return [User(doc.to_dict().get("email")) for doc in docs]


# 🔹 Listar notícias
@router.get("/")
def listar_noticias():
    noticias_ref = db.collection("noticias").stream()

    lista = []
    for doc in noticias_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


# 🔹 Criar notícia + agendar envio de email
@router.post("/")
def criar_noticia(noticia: Noticia, background_tasks: BackgroundTasks):

    doc_ref = db.collection("noticias").add(noticia.dict())

    # montar dados do email
    title = getattr(noticia, "titulo", "Nova notícia")
    description = getattr(noticia, "descricao", "Confira agora os detalhes")
    url = f"https://www.rota7lagoas.com.br/noticia/{doc_ref[1].id}"

    # pegar inscritos
    users = get_all_subscribers()

    # agendar envio (5 min depois)
    background_tasks.add_task(
        schedule_news_email,
        title,
        description,
        url,
        users
    )

    return {"msg": "Notícia criada com sucesso"}


# 🔹 Buscar notícia por ID
@router.get("/{id}")
def buscar_noticia(id: str):
    doc_ref = db.collection("noticias").document(id).get()

    if not doc_ref.exists:
        return {"erro": "Notícia não encontrada"}

    data = doc_ref.to_dict()
    data["id"] = doc_ref.id

    return data


# 🔹 Atualizar notícia
@router.put("/{id}")
def atualizar_noticia(id: str, noticia: Noticia):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    doc_ref.update(noticia.dict())

    return {"msg": "Notícia atualizada com sucesso"}


# 🔹 Deletar notícia
@router.delete("/{id}")
def deletar_noticia(id: str):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    doc_ref.delete()

    return {"msg": "Notícia deletada com sucesso"}