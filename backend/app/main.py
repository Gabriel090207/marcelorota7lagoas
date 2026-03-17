from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import noticias

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 libera tudo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(noticias.router)

@app.get("/")
def home():
    return {"msg": "API Rota 7 Lagoas funcionando"}