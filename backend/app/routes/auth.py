from fastapi import APIRouter
from app.models.user import User
from app.services.firebase import db

router = APIRouter(prefix="/auth", tags=["Auth"])


# 🔐 REGISTRAR
@router.post("/register")
def register(user: User):

    # verifica se já existe
    users_ref = db.collection("users").stream()

    for doc in users_ref:
        data = doc.to_dict()
        if data.get("email") == user.email:
            return {"erro": "Email já cadastrado"}

    # salva usuário
    data = user.dict()
    data["createdAt"] = user.createdAt.isoformat()

    doc_ref = db.collection("users").add(data)

    data["id"] = doc_ref[1].id

    return data


# 🔐 LOGIN
@router.post("/login")
def login(payload: dict):

    email = payload.get("email")
    senha = payload.get("senha")

    users_ref = db.collection("users").stream()

    for doc in users_ref:
        data = doc.to_dict()

        if data.get("email") == email:

            if data.get("senha") != senha:
                return {"erro": "Senha incorreta"}

            data["id"] = doc.id
            return data

    return {"erro": "Conta não encontrada"}