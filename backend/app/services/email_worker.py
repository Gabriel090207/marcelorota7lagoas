import time
from app.services.firebase import db
from app.services.email_sender import send_email

from app.services.email_templates.news_email import news_email_template
from app.services.email_templates.event_email import event_email_template
from app.services.email_templates.dica_email import dica_email_template
from app.services.email_templates.blog_email import blog_email_template

import asyncio


def run_async(coro):
    return asyncio.run(coro())


def process_queue():
    print("🚀 EMAIL WORKER INICIADO...")

    while True:
        docs = db.collection("email_queue") \
            .where("status", "==", "pendente") \
            .stream()

        for doc in docs:
            data = doc.to_dict()
            doc_id = doc.id

            print(f"📩 Processando: {data.get('tipo')}")

            users_docs = db.collection("newsletter").stream()
            users = [u.to_dict().get("email") for u in users_docs]

            if data["tipo"] == "blog":
                html = blog_email_template(
                    data["title"],
                    data["description"],
                    data["url"]
                )
                subject = "Novo blog"

            elif data["tipo"] == "evento":
                html = event_email_template(
                    data["title"],
                    data["description"],
                    data["url"],
                    data.get("data", ""),
                    data.get("horario", "")
                )
                subject = "Novo evento"

            elif data["tipo"] == "dica":
                html = dica_email_template(
                    data["title"],
                    data["description"],
                    data["url"]
                )
                subject = "Nova dica"

            elif data["tipo"] == "noticia":
                html = news_email_template(
                    data["title"],
                    data["description"],
                    data["url"]
                )
                subject = "Nova notícia"

            else:
                continue

            async def send_all():
                for email in users:
                    print(f"📨 enviando para {email}")
                    await send_email(email, subject, html)

            run_async(send_all)

            db.collection("email_queue").document(doc_id).update({
                "status": "enviado",
                "sent_at": time.time()
            })

        time.sleep(10)


if __name__ == "__main__":
    process_queue()