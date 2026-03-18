import AdminLayout from "../components/admin/AdminLayout"
import "./Grupos.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import ConfirmModal from "../components/admin/ConfirmModal"

export default function Grupos() {

  const navigate = useNavigate()

  const [grupos, setGrupos] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!selectedId) return

    setGrupos(prev => prev.filter(grupo => grupo.id !== selectedId))
    setModalOpen(false)
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/grupos`)
      .then(res => res.json())
      .then(data => {
        // garante que sempre seja array
        if (Array.isArray(data)) {
          setGrupos(data)
        } else {
          setGrupos([])
        }
      })
      .catch(err => {
        console.error(err)
        setGrupos([])
      })
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

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