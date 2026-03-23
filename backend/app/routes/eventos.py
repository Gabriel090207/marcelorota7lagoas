from fastapi import APIRouter
from app.services.firebase import db
from pydantic import BaseModel

router = APIRouter(prefix="/eventos", tags=["Eventos"])

class Evento(BaseModel):
    titulo: str
    descricao: str
    data: str
    local: str
    imagem: str = ""
    tag: str = ""

# LISTAR
@router.get("/")
def listar_eventos():
    docs = db.collection("eventos").stream()

    eventos = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        eventos.append(data)

    return eventos

# CRIAR
@router.post("/")
def criar_evento(evento: Evento):
    doc = db.collection("eventos").add(evento.dict())
    return {"msg": "Evento criado", "id": doc[1].id}

# GET BY ID
@router.get("/{id}")
def get_evento(id: str):
    doc = db.collection("eventos").document(id).get()

    if not doc.exists:
        return {"erro": "Evento não encontrado"}

    data = doc.to_dict()
    data["id"] = doc.id
    return data

# UPDATE
@router.put("/{id}")
def update_evento(id: str, evento: Evento):
    db.collection("eventos").document(id).update(evento.dict())
    return {"msg": "Evento atualizado"}

# DELETE
@router.delete("/{id}")
def delete_evento(id: str):
    db.collection("eventos").document(id).delete()
    return {"msg": "Evento deletado"}