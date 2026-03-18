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
    data = doc_ref.get().to_dict()

    if not data:
        return {"erro": "Solicitação não encontrada"}

    # 🔥 se for parceiro
    if data.get("tipo") == "empresa":
        db.collection("parceiros").add(data)

    # 🔥 se for produto
    if data.get("tipo") == "produto":
        db.collection("produtos").add(data)

    doc_ref.delete()

    return {"msg": "Aprovado com sucesso"}


# =========================
# REJEITAR
# =========================
@router.delete("/{id}")
def rejeitar_solicitacao(id: str):

    db.collection("solicitacoes").document(id).delete()

    return {"msg": "Solicitação removida"}