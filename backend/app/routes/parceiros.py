from fastapi import APIRouter
from app.services.firebase import db
import uuid

router = APIRouter(prefix="/parceiros")

@router.get("/")
def listar():
    docs = db.collection("parceiros").stream()
    return [{"id": d.id, **d.to_dict()} for d in docs]


import time

@router.post("/")
def criar(data: dict):
    id = str(uuid.uuid4())

    data["created_at"] = time.time()

    db.collection("parceiros").document(id).set(data)

    return {"id": id}

@router.put("/{id}")
def atualizar(id: str, data: dict):
    db.collection("parceiros").document(id).update(data)
    return {"ok": True}


@router.delete("/{id}")
def deletar(id: str):
    db.collection("parceiros").document(id).delete()
    return {"ok": True}