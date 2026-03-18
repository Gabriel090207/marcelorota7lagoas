import AdminLayout from "../components/admin/AdminLayout"
import "./Anuncios.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import ConfirmModal from "../components/admin/ConfirmModal"

export default function Anuncios() {

  const navigate = useNavigate()

  const [anuncios, setAnuncios] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!selectedId) return

    setAnuncios(prev => prev.filter(anuncio => anuncio.id !== selectedId))
    setModalOpen(false)
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/anuncios`)
      .then(res => res.json())
      .then(data => {
        // evita crash igual dos grupos
        if (Array.isArray(data)) {
          setAnuncios(data)
        } else {
          setAnuncios([])
        }
      })
      .catch(err => {
        console.error(err)
        setAnuncios([])
      })
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Anúncios</h1>
            <p>Gerencie os anúncios do sistema</p>
          </div>

          <Link to="/anuncios/novo" className="btn btn--primary">
            <FiPlus />
            Novo anúncio
          </Link>

        </div>

        <div className="adminTable">

          {anuncios.length === 0 ? (
            <p style={{ opacity: 0.6 }}>
              Nenhum anúncio cadastrado
            </p>
          ) : (
            anuncios.map((anuncio) => (

              <div key={anuncio.id} className="adminTable__row">

                <div className="adminTable__title">
                  {anuncio.titulo}
                </div>

                <div className="adminTable__category">
                  {anuncio.tipo || "Anúncio"}
                </div>

                <div className="adminTable__actions">

                  <button
                    className="iconBtn"
                    onClick={() => navigate(`/anuncios/editar/${anuncio.id}`)}
                  >
                    <FiEdit />
                  </button>

                  <button
                    className="iconBtn danger"
                    onClick={() => {
                      setSelectedId(anuncio.id)
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
          title="Excluir anúncio"
          message="Tem certeza que deseja excluir este anúncio?"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}