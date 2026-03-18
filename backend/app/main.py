from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import noticias
from app.routes import dicas
from app.routes import eventos
from app.routes import parceiros


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

@app.get("/")
def home():
    return {"msg": "API Rota 7 Lagoas funcionando"}