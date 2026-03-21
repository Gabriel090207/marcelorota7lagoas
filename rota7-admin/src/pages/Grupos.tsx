import AdminLayout from "../components/admin/AdminLayout"
import "./Grupos.css"

import { FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import ConfirmModal from "../components/admin/ConfirmModal"

import { getGrupos, deleteGrupo } from "../services/api"

export default function Grupos() {

  const navigate = useNavigate()

  const [grupos, setGrupos] = useState<any[]>([])
  const [solicitacoes, setSolicitacoes] = useState<any[]>([])
  const [abaAtiva, setAbaAtiva] = useState<"grupos" | "solicitacoes">("grupos")

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 🔥 DELETE
  const handleDelete = async () => {
    if (!selectedId) return

    try {
      await deleteGrupo(selectedId)
      setGrupos(prev => prev.filter(grupo => grupo.id !== selectedId))
      setModalOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  // 🔥 carregar grupos
  useEffect(() => {
    getGrupos()
      .then(data => {
        if (Array.isArray(data)) {
          setGrupos(data)
        } else {
          setGrupos([])
        }
      })
      .catch(() => setGrupos([]))
  }, [])

  // 🔥 carregar solicitações
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const grupos = data.filter((item: any) => item.tipo === "grupo")
          setSolicitacoes(grupos)
        } else {
          setSolicitacoes([])
        }
      })
      .catch(() => setSolicitacoes([]))
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

        {/* HEADER */}
        <div className="adminPage__header">

          <div>
            <h1>Grupos</h1>
            <p>Gerencie os grupos da comunidade</p>
          </div>

          <Link to="/grupos/novo" className="btn btn--primary">
            <FiPlus />
            Novo grupo
          </Link>

        </div>

        {/* ABAS */}
        <div className="adminTabs">

          <button
            className={`adminTab ${abaAtiva === "grupos" ? "active" : ""}`}
            onClick={() => setAbaAtiva("grupos")}
          >
            Grupos
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>

        </div>

        {/* ================= GRUPOS ================= */}
        {abaAtiva === "grupos" && (

          <div className="adminTable">

            {grupos.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhum grupo cadastrado
              </p>
            ) : (
              grupos.map((grupo) => (

                <div key={grupo.id} className="adminTable__row">

                  <div className="adminTable__title">
                    {grupo.nome}
                  </div>

                  <div className="adminTable__category">
                    {grupo.tipo || "Grupo"}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/grupos/editar/${grupo.id}`)}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="iconBtn danger"
                      onClick={() => {
                        setSelectedId(grupo.id)
                        setModalOpen(true)
                      }}
                    >
                      <FiTrash />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>

        )}

        {/* ================= SOLICITAÇÕES ================= */}
        {abaAtiva === "solicitacoes" && (

          <div className="adminTable">

            {solicitacoes.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhuma solicitação pendente
              </p>
            ) : (
              solicitacoes.map((s) => (

                <div key={s.id} className="adminTable__row">

                  <div className="adminTable__title">
                    {s.nome}
                  </div>

                  <div className="adminTable__category">
                    {s.tipoGrupo}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/grupos/solicitacoes/${s.id}`)}
                    >
                      <FiEye />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>

        )}

        {/* MODAL */}
        <ConfirmModal
          open={modalOpen}
          title="Excluir grupo"
          message="Tem certeza que deseja excluir este grupo?"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}