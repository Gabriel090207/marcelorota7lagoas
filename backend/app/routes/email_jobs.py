from fastapi import APIRouter
from app.services.firebase import db
from app.services.email_sender import send_email

from app.services.email_templates.news_email import news_email_template
from app.services.email_templates.event_email import event_email_template
from app.services.email_templates.dica_email import dica_email_template
from app.services.email_templates.blog_email import blog_email_template

import time

router = APIRouter(prefix="/jobs", tags=["Jobs"])


def get_all_subscribers():
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    return [User(doc.to_dict().get("email")) for doc in docs]


@router.get("/send-emails")
def send_pending_emails():

    docs = db.collection("email_queue") \
        .where("status", "==", "pendente") \
        .stream()

    users = get_all_subscribers()

    enviados = 0

    for doc in docs:
        data = doc.to_dict()

        # ⏳ espera 5 minutos
        if time.time() - data["created_at"] < 300:
            continue

        print(f"📨 Processando {data['tipo']}")

        # 🔥 EVENTO
        if data["tipo"] == "evento":
            html = event_email_template(
                data["title"],
                data["description"],
                data["url"],
                data["data"],
                data["horario"]
            )
            assunto = "Novo evento"

        # 🔥 NOTICIA
        elif data["tipo"] == "noticia":
            html = news_email_template(
                data["title"],
                data["description"],
                data["url"]
            )
            assunto = "Nova notícia"

        # 🔥 DICA
        elif data["tipo"] == "dica":
            html = dica_email_template(
                data["title"],
                data["description"],
                data["url"]
            )
            assunto = "Nova dica"

        # 🔥 BLOG
        elif data["tipo"] == "blog":
            html = blog_email_template(
                data["title"],
                data["description"],
                data["url"]
            )
            assunto = "Novo blog"

        else:
            continue

        for user in users:
            print(f"📩 enviando para {user.email}")
            send_email(user.email, assunto, html)

        db.collection("email_queue").document(doc.id).update({
            "status": "enviado"
        })

        enviados += 1

    return {"msg": f"{enviados} enviados"}