from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import noticias, dicas, eventos, parceiros, solicitacoes, grupos, anuncios, galeria
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


@app.get("/")
def home():
    return {"msg": "API Rota 7 Lagoas funcionando"}