import { useState, useEffect } from "react"
import AdminLayout from "../components/admin/AdminLayout"
import "./Parceiros.css"

import { FiPlus, FiEdit, FiTrash, FiEye, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { getParceiros, deleteParceiro } from "../services/api"
import ConfirmModal from "../components/admin/ConfirmModal"

export default function Parceiros() {

  const navigate = useNavigate()

  const [abaAtiva, setAbaAtiva] = useState<"parceiros" | "solicitacoes">("parceiros")

  const [parceiros, setParceiros] = useState<any[]>([])
  const [solicitacoes, setSolicitacoes] = useState<any[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<"success" | "error">("success")
const [toastMessage, setToastMessage] = useState("")


const showToast = (type: "success" | "error", message: string) => {
  setToastType(type)
  setToastMessage(message)
  setToastOpen(true)

  setTimeout(() => {
    setToastOpen(false)
  }, 3200)
}


  // 🔥 carregar parceiros
  useEffect(() => {
    getParceiros().then(setParceiros)
  }, [])

  // 🔥 carregar solicitações
 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
    .then(res => res.json())
    .then(data => {
      const empresas = data.filter((item: any) => item.tipo === "empresa")
      setSolicitacoes(empresas)
    })
}, [])

const parceirosOrdenados = [...parceiros].sort((a, b) => {
  return b.id.localeCompare(a.id)
})

  // 🔥 excluir parceiro
  const handleDelete = async () => {
  if (!selectedId) return

  try {
    await deleteParceiro(selectedId)

    setParceiros(prev => prev.filter(p => p.id !== selectedId))
    setModalOpen(false)

    showToast("success", "Parceiro deletado com sucesso!")

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao deletar parceiro.")
  }
}

const toggleAtivo = async (parceiro: any) => {
  try {
    const novoStatus = !parceiro.ativo

    await fetch(`${import.meta.env.VITE_API_URL}/parceiros/${parceiro.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...parceiro,
        ativo: novoStatus
      })
    })

    setParceiros(prev =>
      prev.map(p =>
        p.id === parceiro.id ? { ...p, ativo: novoStatus } : p
      )
    )

    showToast(
      "success",
      novoStatus ? "Ativado com sucesso!" : "Desativado com sucesso!"
    )

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao atualizar status.")
  }
}

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

  <div className="adminToast__icon">
    {toastType === "success"
      ? <FiCheckCircle size={18} />
      : <FiAlertCircle size={18} />}
  </div>

  <div className="adminToast__content">
    <strong>
      {toastType === "success" ? "Sucesso" : "Atenção"}
    </strong>
    <span>{toastMessage}</span>
  </div>

  <button
    className="adminToast__close"
    onClick={() => setToastOpen(false)}
    type="button"
  >
    <FiX size={18} />
  </button>

</div>

        <div className="adminPage__header">
          <div>
            <h1>Parceiros</h1>
            <p>Gerencie os parceiros do portal</p>
          </div>

          <Link to="/parceiros/novo" className="btn btn--primary">
            <FiPlus />
            Novo parceiro
          </Link>
        </div>

        {/* ABAS */}
        <div className="adminTabs">

          <button
            className={`adminTab ${abaAtiva === "parceiros" ? "active" : ""}`}
            onClick={() => setAbaAtiva("parceiros")}
          >
            Parceiros
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>

        </div>

        {/* ================= PARCEIROS ================= */}
        {abaAtiva === "parceiros" && (
          <div className="adminTable">

            {parceirosOrdenados.map(parceiro => (
              <div key={parceiro.id} className="adminTable__row">

                <div className="adminTable__title">
                  {parceiro.nome}
                </div>

                <div className="adminTable__category">
                  {parceiro.categoria}
                </div>

                <div className="adminTable__actions">

                 <div
  className={`toggleSwitch ${parceiro.ativo ? "active" : ""}`}
  onClick={() => toggleAtivo(parceiro)}
>
  <div className="toggleSwitch__circle" />
</div>
                  <button
                    className="iconBtn"
                    onClick={() => navigate(`/parceiros/editar/${parceiro.id}`)}
                  >
                    <FiEdit />
                  </button>

                  <button
                    className="iconBtn danger"
                    onClick={() => {
                      setSelectedId(parceiro.id)
                      setModalOpen(true)
                    }}
                  >
                    <FiTrash />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* ================= SOLICITAÇÕES ================= */}
        {abaAtiva === "solicitacoes" && (
          <div className="adminTable">

            {solicitacoes.map(s => (

              <div
                key={s.id}
                className="adminTable__row adminTable__row--solicitacao"
              >

                <div className="adminTable__title">
                  {s.tipo === "empresa" ? s.nome : s.titulo}
                </div>

                <div className="adminTable__category">
                  {s.categoria}
                </div>

              

                <div className="adminTable__actions">

                  {/* 👁️ VER DETALHE */}
                  <button
                    className="iconBtn"
                    onClick={() => navigate(`/solicitacoes/${s.id}`)}
                  >
                    <FiEye />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* MODAL */}
        <ConfirmModal
          open={modalOpen}
          title="Excluir parceiro"
          message="Tem certeza que deseja excluir?"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}