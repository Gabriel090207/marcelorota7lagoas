from fastapi import APIRouter, BackgroundTasks
from app.models.blog import Blog
from app.services.firebase import db
from app.services.email_scheduler import schedule_blog_email

router = APIRouter(prefix="/blogs", tags=["Blogs"])


# 🔹 Buscar inscritos
def get_all_subscribers():
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    return [User(doc.to_dict().get("email")) for doc in docs]


# 🔹 LISTAR
@router.get("/")
def listar_blogs():
    blogs_ref = db.collection("blogs").stream()

    lista = []
    for doc in blogs_ref:
        data = doc.to_dict()
        data["id"] = doc.id
        lista.append(data)

    return lista


# 🔹 CRIAR
import time

@router.post("/")
def criar_blog(blog: Blog, background_tasks: BackgroundTasks):

    data = blog.dict()


    import re

    def gerar_slug(texto):
        texto = texto.lower()
        texto = re.sub(r"[^\w\s-]", "", texto)
        texto = re.sub(r"\s+", "-", texto)
        return texto

    data["slug"] = gerar_slug(blog.titulo)
    data["created_at"] = time.time()

    doc_ref = db.collection("blogs").add(data)
    blog_id = doc_ref[1].id

    # montar dados do email
    title = getattr(blog, "titulo", "Novo blog")
    description = getattr(blog, "conteudo", "")
    url = f"https://www.rota7lagoas.com.br/blog/{blog_id}"

    # pegar inscritos
    users = get_all_subscribers()

    # agendar envio (5 min depois)
    background_tasks.add_task(
        schedule_blog_email,
        title,
        description,
        url,
        users
    )

    return {"msg": "Blog criado com sucesso"}


# 🔹 BUSCAR
@router.get("/{id_ou_slug}")
def buscar_blog(id_ou_slug: str):

    # tenta por ID
    doc_ref = db.collection("blogs").document(id_ou_slug).get()

    if doc_ref.exists:
        data = doc_ref.to_dict()
        data["id"] = doc_ref.id
        return data

    # tenta por SLUG
    blogs_ref = db.collection("blogs").stream()

    for doc in blogs_ref:
        data = doc.to_dict()

        if data.get("slug") == id_ou_slug:
            data["id"] = doc.id
            return data

    return {"erro": "Blog não encontrado"}

# 🔹 ATUALIZAR
@router.put("/{id}")
def atualizar_blog(id: str, blog: Blog):
    doc_ref = db.collection("blogs").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Blog não encontrado"}

    doc_ref.update(blog.dict())

    return {"msg": "Blog atualizado com sucesso"}


# 🔹 DELETAR
@router.delete("/{id}")
def deletar_blog(id: str):
    doc_ref = db.collection("blogs").document(id)

    if not doc_ref.get().exists:
        return {"erro": "Blog não encontrado"}

    doc_ref.delete()

    return {"msg": "Blog deletado com sucesso"}


from fastapi.responses import HTMLResponse

@router.get("/preview/{id_ou_slug}", response_class=HTMLResponse)
def preview_blog(id_ou_slug: str):

    # 🔎 tenta por ID
    doc_ref = db.collection("blogs").document(id_ou_slug).get()

    if doc_ref.exists:
        data = doc_ref.to_dict()
        data["id"] = doc_ref.id
    else:
        # 🔎 tenta por SLUG
        blogs_ref = db.collection("blogs").stream()
        data = None

        for doc in blogs_ref:
            d = doc.to_dict()
            if d.get("slug") == id_ou_slug:
                d["id"] = doc.id
                data = d
                break

        if not data:
            return "<h1>Blog não encontrado</h1>"

    titulo = data.get("titulo", "Blog")
    imagem = data.get("imagem", "")
    descricao = titulo
    slug = data.get("slug", data.get("id"))

    url = f"https://rota7lagoas.com.br/blog/{slug}"

    html = f"""
    <html>
      <head>
        <title>{titulo}</title>

        <meta property="og:title" content="{titulo}" />
        <meta property="og:description" content="{descricao}" />
        <meta property="og:image" content="{imagem}" />
        <meta property="og:url" content="{url}" />
        <meta property="og:type" content="article" />
      </head>

      <body>
        <script>
          window.location.href = "{url}"
        </script>
      </body>
    </html>
    """

    return HTMLResponse(content=html)