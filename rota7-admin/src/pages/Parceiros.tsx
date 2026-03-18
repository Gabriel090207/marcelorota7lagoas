import { useState, useEffect } from "react"
import AdminLayout from "../components/admin/AdminLayout"
import "./Parceiros.css"

import { FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi"
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

  // 🔥 carregar parceiros
  useEffect(() => {
    getParceiros().then(setParceiros)
  }, [])

  // 🔥 carregar solicitações
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(setSolicitacoes)
  }, [])

  // 🔥 excluir parceiro
  const handleDelete = async () => {
    if (!selectedId) return

    await deleteParceiro(selectedId)

    setParceiros(prev => prev.filter(p => p.id !== selectedId))
    setModalOpen(false)
  }

  return (
    <AdminLayout>

      <main className="adminPage">

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

            {parceiros.map(parceiro => (
              <div key={parceiro.id} className="adminTable__row">

                <div className="adminTable__title">
                  {parceiro.nome}
                </div>

                <div className="adminTable__category">
                  {parceiro.categoria}
                </div>

                <div className="adminTable__actions">

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

                <div className="adminTable__status">
                  {s.tipo === "empresa" ? s.email : s.preco}
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