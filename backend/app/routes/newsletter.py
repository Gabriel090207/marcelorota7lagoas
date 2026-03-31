from fastapi import APIRouter
from app.services.firebase import db

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


@router.post("/")
def salvar_email(data: dict):
    email = data.get("email")

    if not email:
        return {"erro": "Email obrigatório"}

    # 🔥 salva no Firebase
    db.collection("newsletter").add({
        "email": email
    })

    return {"msg": "Email salvo com sucesso"}