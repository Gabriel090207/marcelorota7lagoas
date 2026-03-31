import time
import asyncio
from app.services.email_sender import send_email

from app.services.email_templates.news_email import news_email_template
from app.services.email_templates.event_email import event_email_template
from app.services.email_templates.dica_email import dica_email_template
from app.services.email_templates.blog_email import blog_email_template


# 🔥 helper para rodar async dentro de função normal
def run_async(coro):
    return asyncio.run(coro)


# 🔥 NOTICIA
def schedule_news_email(title, description, url, users):
    print("🔥 INICIANDO NOTICIA")

    time.sleep(300)

    html = news_email_template(title, description, url)

    async def send_all():
        for user in users:
            print(f"📩 enviando noticia para: {user.email}")
            await send_email(user.email, "Nova notícia", html)

    run_async(send_all())


# 🔥 EVENTO
def schedule_event_email(title, description, url, users, data, horario):
    print("🔥 INICIANDO EVENTO")

    time.sleep(300)

    html = event_email_template(title, description, url, data, horario)

    async def send_all():
        for user in users:
            print(f"📩 enviando evento para: {user.email}")
            await send_email(user.email, "Novo evento", html)

    run_async(send_all())


# 🔥 DICA
def schedule_dica_email(title, description, url, users):
    print("🔥 INICIANDO DICA")

    time.sleep(300)

    html = dica_email_template(title, description, url)

    async def send_all():
        for user in users:
            print(f"📩 enviando dica para: {user.email}")
            await send_email(user.email, "Nova dica", html)

    run_async(send_all())


# 🔥 BLOG
def schedule_blog_email(title, description, url, users):
    print("🔥 INICIANDO BLOG")

    time.sleep(300)

    html = blog_email_template(title, description, url)

    async def send_all():
        for user in users:
            print(f"📩 enviando blog para: {user.email}")
            await send_email(user.email, "Novo blog", html)

    run_async(send_all())