from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import noticias, dicas, eventos, parceiros, solicitacoes, grupos, anuncios, galeria, blogs


from fastapi import FastAPI



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 libera tudo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(noticias.router)
app.include_router(dicas.router)
app.include_router(eventos.router)
app.include_router(parceiros.router)
app.include_router(solicitacoes.router)
app.include_router(grupos.router)
app.include_router(anuncios.router)
app.include_router(galeria.router)
app.include_router(blogs.router)


@app.get("/")
def home():
    return {"msg": "API Rota 7 Lagoas funcionando"}

from app.services.email_sender import send_email
from app.services.email_templates.news_email import news_email_template


@app.get("/test-email")
async def test_email():
    html = news_email_template(
        "Teste de notícia",
        "Isso é um teste de envio 🚀",
        "https://www.rota7lagoas.com.br"
    )

    await send_email(
        to="gabrielborela07@gmail.com",
        subject="Teste email",
        html=html
    )

    return {"msg": "Email enviado"}