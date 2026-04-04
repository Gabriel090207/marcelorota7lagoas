from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import HTMLResponse
import re

from app.services.email_scheduler import schedule_news_email
from app.models.noticia import Noticia
from app.services.firebase import db
from datetime import datetime


router = APIRouter(prefix="/noticias", tags=["Noticias"])


# 🔥 GERAR SLUG
def gerar_slug(texto):
    texto = texto.lower()
    texto = re.sub(r"[^\w\s-]", "", texto)
    texto = re.sub(r"\s+", "-", texto)
    return texto


# 🔹 Buscar emails inscritos
def get_all_subscribers():
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    return [User(doc.to_dict().get("email")) for doc in docs]


# 🔹 LISTAR
@router.get("/")
def listar_noticias():
    noticias_ref = db.collection("noticias").stream()

    lista = []
    for doc in noticias_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


# 🔹 CRIAR (COM SLUG)
@router.post("/")
def criar_noticia(noticia: Noticia, background_tasks: BackgroundTasks):

    data = noticia.dict()

    # 🔥 gera slug
    data["slug"] = gerar_slug(noticia.titulo)

    data["created_at"] = datetime.utcnow().isoformat()

    doc_ref = db.collection("noticias").add(data)

    # 🔹 EMAIL
    title = noticia.titulo
    description = noticia.titulo  # 👈 cliente pediu título aqui
    url = f"https://www.rota7lagoas.com.br/noticia/{data['slug']}"

    users = get_all_subscribers()

    background_tasks.add_task(
        schedule_news_email,
        title,
        description,
        url,
        users
    )

    return {"msg": "Notícia criada com sucesso"}


# 🔹 BUSCAR (ID OU SLUG 🔥)
@router.get("/{id_ou_slug}")
def buscar_noticia(id_ou_slug: str):

    # 🔎 tenta por ID
    doc_ref = db.collection("noticias").document(id_ou_slug).get()

    if doc_ref.exists:
        data = doc_ref.to_dict()
        data["id"] = doc_ref.id
        return data

    # 🔎 tenta por SLUG
    noticias_ref = db.collection("noticias").stream()

    for doc in noticias_ref:
        data = doc.to_dict()

        if data.get("slug") == id_ou_slug:
            data["id"] = doc.id
            return data

    return {"erro": "Notícia não encontrada"}


# 🔹 ATUALIZAR (COM SLUG 🔥)
@router.put("/{id}")
def atualizar_noticia(id: str, noticia: Noticia):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    data = noticia.dict()

    # 🔥 atualiza slug se tiver título
    if noticia.titulo:
        data["slug"] = gerar_slug(noticia.titulo)

    doc_ref.update(data)

    return {"msg": "Notícia atualizada com sucesso"}


# 🔹 DELETAR
@router.delete("/{id}")
def deletar_noticia(id: str):
    doc_ref = db.collection("noticias").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Notícia não encontrada"}

    doc_ref.delete()

    return {"msg": "Notícia deletada com sucesso"}


# 🔹 PREVIEW (PARA WHATSAPP 🔥)
@router.get("/preview/{id}", response_class=HTMLResponse)
def preview_noticia(id: str):
    doc_ref = db.collection("noticias").document(id).get()

    if not doc_ref.exists:
        return "<h1>Notícia não encontrada</h1>"

    data = doc_ref.to_dict()

    titulo = data.get("titulo", "Notícia")
    imagem = data.get("imagem", "")

    # 🔥 cliente pediu isso
    descricao = titulo

    slug = data.get("slug", id)

    url = f"https://portalrota7lagoas.netlify.app/noticia/{slug}"

    html = f"""
    <html>
      <head>
        <title>{titulo}</title>

        <!-- Open Graph -->
        <meta property="og:title" content="{titulo.strip()}" />
        <meta property="og:description" content="{descricao}" />
        <meta property="og:image" content="{imagem}" />
        <meta property="og:url" content="{url}" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Portal Rota 7 Lagoas" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <body>
        <h1>Redirecionando...</h1>

        <script>
          setTimeout(() => {{
            window.location.href = "{url}"
          }}, 1500)
        </script>
      </body>
    </html>
    """

    return HTMLResponse(content=html)