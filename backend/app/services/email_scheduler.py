import time
from app.services.email_sender import send_email

from app.services.email_templates.news_email import news_email_template
from app.services.email_templates.event_email import event_email_template
from app.services.email_templates.dica_email import dica_email_template
from app.services.email_templates.blog_email import blog_email_template


# 🔥 NOTICIA
def schedule_news_email(title, description, url, users):
    time.sleep(300)

    html = news_email_template(title, description, url)

    for user in users:
        send_email(user.email, "Nova notícia", html)


# 🔥 EVENTO
def schedule_event_email(title, description, url, users, data, horario):
    time.sleep(300)

    html = event_email_template(title, description, url, data, horario)

    for user in users:
        send_email(user.email, "Novo evento", html)


# 🔥 DICA
def schedule_dica_email(title, description, url, users):
    time.sleep(300)

    html = dica_email_template(title, description, url)

    for user in users:
        send_email(user.email, "Nova dica", html)


# 🔥 BLOG
def schedule_blog_email(title, description, url, users):
    time.sleep(300)

    html = blog_email_template(title, description, url)

    for user in users:
        send_email(user.email, "Novo blog", html)