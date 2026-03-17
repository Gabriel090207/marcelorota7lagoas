from fastapi import APIRouter
from app.services.firebase import db
from pydantic import BaseModel

router = APIRouter(prefix="/dicas", tags=["Dicas"])

class Dica(BaseModel):
    titulo: str
    conteudo: str
    categoria: str = ""
    imagem: str = ""
    autor: str = ""

# LISTAR
@router.get("/")
def listar_dicas():
    docs = db.collection("dicas").stream()

    dicas = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        dicas.append(data)

    return dicas

# CRIAR
@router.post("/")
def criar_dica(dica: Dica):
    doc_ref = db.collection("dicas").add(dica.dict())
    return {"msg": "Dica criada", "id": doc_ref[1].id}

# BUSCAR POR ID
@router.get("/{id}")
def get_dica(id: str):
    doc = db.collection("dicas").document(id).get()

    if not doc.exists:
        return {"erro": "Dica não encontrada"}

    data = doc.to_dict()
    data["id"] = doc.id

    return data

# ATUALIZAR
@router.put("/{id}")
def atualizar_dica(id: str, dica: Dica):
    db.collection("dicas").document(id).update(dica.dict())
    return {"msg": "Dica atualizada"}

# DELETAR
@router.delete("/{id}")
def deletar_dica(id: str):
    db.collection("dicas").document(id).delete()
    return {"msg": "Dica deletada"}