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

  // 🔥 MOCK TEMPORÁRIO (depois vem do backend)
  const [solicitacoes] = useState([
    {
      id: "1",
      empresa: "Oficina Duas Rodas",
      categoria: "Oficina",
      responsavel: "Carlos Henrique",
      status: "Nova"
    },
    {
      id: "2",
      empresa: "Trilha Moto Peças",
      categoria: "Peças",
      responsavel: "Fernanda Souza",
      status: "Pendente"
    }
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 🔥 carregar parceiros reais
  useEffect(() => {
    getParceiros().then(setParceiros)
  }, [])

  // 🔥 excluir parceiro
  const handleDelete = async () => {
    if (!selectedId) return

    try {
      await deleteParceiro(selectedId)

      setParceiros(prev => prev.filter(p => p.id !== selectedId))

      setModalOpen(false)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdminLayout>

      <main className="adminPage">

        {/* HEADER */}
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

        {/* 🔥 PARCEIROS */}
        {abaAtiva === "parceiros" && (
          <div className="adminTable">

            {parceiros.length === 0 && (
              <p className="emptyState">Nenhum parceiro cadastrado</p>
            )}

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

        {/* 🔥 SOLICITAÇÕES (PRONTO PRA BACKEND) */}
        {abaAtiva === "solicitacoes" && (
          <div className="adminTable">

            {solicitacoes.length === 0 && (
              <p className="emptyState">Nenhuma solicitação</p>
            )}

            {solicitacoes.map(solicitacao => (

              <div
                key={solicitacao.id}
                className="adminTable__row adminTable__row--solicitacao"
              >

                <div className="adminTable__title">
                  {solicitacao.empresa}
                </div>

                <div className="adminTable__category">
                  {solicitacao.categoria}
                </div>

                <div className="adminTable__status">
                  {solicitacao.status}
                </div>

                <div className="adminTable__actions">

                  <button
                    className="iconBtn"
                    onClick={() => navigate(`/parceiros/solicitacoes/${solicitacao.id}`)}
                  >
                    <FiEye />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* 🔥 MODAL */}
        <ConfirmModal
          open={modalOpen}
          title="Excluir parceiro"
          message="Tem certeza que deseja excluir este parceiro? Essa ação não pode ser desfeita."
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}