from fastapi import APIRouter, BackgroundTasks
from app.services.firebase import db
from pydantic import BaseModel
from app.services.email_scheduler import schedule_dica_email

router = APIRouter(prefix="/dicas", tags=["Dicas"])


class Dica(BaseModel):
    titulo: str
    conteudo: str
    categoria: str = ""
    imagem: str = ""
    autor: str = ""


# 🔹 LISTAR
@router.get("/")
def listar_dicas():
    docs = db.collection("dicas").stream()

    dicas = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        dicas.append(data)

    return dicas

from datetime import datetime

@router.post("/")
def criar_dica(dica: Dica, background_tasks: BackgroundTasks):

    data = dica.dict()
    data["created_at"] = datetime.utcnow().isoformat()

    doc_ref = db.collection("dicas").add(data)
    dica_id = doc_ref[1].id

    # 🔹 pegar inscritos
    docs = db.collection("newsletter").stream()

    class User:
        def __init__(self, email):
            self.email = email

    users = [User(doc.to_dict().get("email")) for doc in docs]

    # 🔹 agendar envio
    background_tasks.add_task(
        schedule_dica_email,
        dica.titulo,
        dica.conteudo,
        f"https://www.rota7lagoas.com.br/dica/{dica_id}",
        users
    )

    return {
        "msg": "Dica criada com sucesso",
        "id": dica_id
    }

# 🔹 BUSCAR
@router.get("/{id}")
def get_dica(id: str):
    doc = db.collection("dicas").document(id).get()

    if not doc.exists:
        return {"erro": "Dica não encontrada"}

    data = doc.to_dict()
    data["id"] = doc.id
    return data


# 🔹 ATUALIZAR
@router.put("/{id}")
def atualizar_dica(id: str, dica: Dica):
    db.collection("dicas").document(id).update(dica.dict())
    return {"msg": "Dica atualizada com sucesso"}


# 🔹 DELETAR
@router.delete("/{id}")
def deletar_dica(id: str):
    db.collection("dicas").document(id).delete()
    return {"msg": "Dica deletada com sucesso"}