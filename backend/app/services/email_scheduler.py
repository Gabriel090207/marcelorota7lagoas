import asyncio
from app.services.email_templates.news_email import news_email_template
from app.services.email_sender import send_email  # vamos criar depois


async def schedule_news_email(title, description, url, users):
    # ⏳ espera 5 minutos
    await asyncio.sleep(300)

    # gera HTML
    html = news_email_template(title, description, url)

    # envia para todos
    for user in users:
        await send_email(
            to=user.email,
            subject="Nova notícia publicada",
            html=html
        )