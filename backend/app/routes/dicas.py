from fastapi import APIRouter, BackgroundTasks
from app.services.firebase import db
from pydantic import BaseModel
from app.services.email_scheduler import schedule_dica_email


from datetime import datetime
from typing import Optional



router = APIRouter(prefix="/dicas", tags=["Dicas"])


class Dica(BaseModel):
    titulo: str
    conteudo: str
    categoria: str = ""
    imagem: str = ""
    autor: str = ""
    data: Optional[datetime] = datetime.now()
    slug: Optional[str] = None

# 🔹 LISTAR
@router.get("/")
def listar_dicas():
    docs = db.collection("dicas").stream()

    dicas = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        dicas.append(data)

    return dicas

from datetime import datetime

@router.post("/")
def criar_dica(dica: Dica, background_tasks: BackgroundTasks):

    data = dica.dict()


    import re

    def gerar_slug(texto):
        texto = texto.lower()
        texto = re.sub(r"[^\w\s-]", "", texto)
        texto = re.sub(r"\s+", "-", texto)
        return texto

    data["slug"] = gerar_slug(dica.titulo)

    agora = datetime.now()

    data["data"] = agora.isoformat()

    doc_ref = db.collection("dicas").add(data)
    dica_id = doc_ref[1].id

    # 🔹 pegar inscritos
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    users = [User(doc.to_dict().get("email")) for doc in docs]

    # 🔹 agendar envio
    background_tasks.add_task(
        schedule_dica_email,
        dica.titulo,
        dica.conteudo,
        f"https://www.rota7lagoas.com.br/dica/{dica_id}",
        users
    )

    return {
        "msg": "Dica criada com sucesso",
        "id": dica_id
    }

# 🔹 BUSCAR
@router.get("/{id_ou_slug}")
def get_dica(id_ou_slug: str):

    # 🔎 tenta por ID
    doc = db.collection("dicas").document(id_ou_slug).get()

    if doc.exists:
        data = doc.to_dict()
        data["id"] = doc.id
        return data

    # 🔎 tenta por SLUG
    docs = db.collection("dicas").stream()

    for d in docs:
        data = d.to_dict()
        if data.get("slug") == id_ou_slug:
            data["id"] = d.id
            return data

    return {"erro": "Dica não encontrada"}


# 🔹 ATUALIZAR
@router.put("/{id}")
def atualizar_dica(id: str, dica: Dica):
    db.collection("dicas").document(id).update(dica.dict())
    return {"msg": "Dica atualizada com sucesso"}


# 🔹 DELETAR
@router.delete("/{id}")
def deletar_dica(id: str):
    db.collection("dicas").document(id).delete()
    return {"msg": "Dica deletada com sucesso"}




from fastapi.responses import HTMLResponse

@router.get("/preview/{id_ou_slug}", response_class=HTMLResponse)
def preview_dica(id_ou_slug: str):

    doc = db.collection("dicas").document(id_ou_slug).get()

    if doc.exists:
        data = doc.to_dict()
        data["id"] = doc.id
    else:
        docs = db.collection("dicas").stream()
        data = None

        for d in docs:
            dd = d.to_dict()
            if dd.get("slug") == id_ou_slug:
                dd["id"] = d.id
                data = dd
                break

        if not data:
            return "<h1>Dica não encontrada</h1>"

    titulo = data.get("titulo", "Dica")
    imagem = data.get("imagem", "")

    # 🔥 corrigir Firebase (CRÍTICO)
    if imagem and "firebasestorage.googleapis.com" in imagem and "?alt=media" not in imagem:
        imagem = imagem + "?alt=media"
    descricao = titulo
    slug = data.get("slug", data.get("id"))

    url = f"https://rota7lagoas.com.br/dicas/{slug}"

    html = f"""
    <html>
      <head>
        <title>{titulo}</title>

        <meta property="og:title" content="{titulo}" />
        <meta property="og:description" content="{descricao}" />
        <meta property="og:image" content="{imagem}" />
        <meta property="og:image:secure_url" content="{imagem}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content="{url}" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Rota 7 Lagoas" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <body>
        <script>
          window.location.href = "{url}"
        </script>
      </body>
    </html>
    """

    return HTMLResponse(content=html)