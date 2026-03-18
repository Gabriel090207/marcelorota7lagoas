from fastapi import APIRouter
from app.services.firebase import db

router = APIRouter(prefix="/solicitacoes", tags=["Solicitações"])

# =========================
# CRIAR SOLICITAÇÃO
# =========================
@router.post("/")
def criar_solicitacao(data: dict):

    db.collection("solicitacoes").add({
        **data,
        "status": "pendente"
    })

    return {"msg": "Solicitação enviada com sucesso"}


# =========================
# LISTAR SOLICITAÇÕES
# =========================
@router.get("/")
def listar_solicitacoes():

    docs = db.collection("solicitacoes").stream()

    lista = []

    for doc in docs:
        item = doc.to_dict()
        item["id"] = doc.id
        lista.append(item)

    return lista


# =========================
# APROVAR
# =========================
@router.post("/aprovar/{id}")
def aprovar_solicitacao(id: str):

    doc_ref = db.collection("solicitacoes").document(id)
    doc = doc_ref.get()

    if not doc.exists:
        return {"erro": "Solicitação não encontrada"}

    data = doc.to_dict()

    # 🔥 remove campos desnecessários
    data.pop("status", None)

    # 🔥 EMPRESA → PARCEIRO
    if data.get("tipo") == "empresa":
        db.collection("parceiros").add(data)

    # 🔥 PRODUTO → ANÚNCIO
    elif data.get("tipo") == "produto":
        db.collection("anuncios").add(data)

    # 🔥 remove solicitação
    doc_ref.delete()

    return {"msg": "Aprovado com sucesso"}

    
# =========================
# REJEITAR
# =========================
@router.delete("/{id}")
def rejeitar_solicitacao(id: str):

    db.collection("solicitacoes").document(id).delete()

    return {"msg": "Solicitação removida"}



@router.get("/{id}")
def buscar_solicitacao(id: str):
    doc = db.collection("solicitacoes").document(id).get()

    if not doc.exists:
        return {"erro": "Solicitação não encontrada"}

    data = doc.to_dict()
    data["id"] = doc.id

    return data