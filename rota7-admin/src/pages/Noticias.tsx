import AdminLayout from "../components/admin/AdminLayout"
import { Link, useNavigate } from "react-router-dom"
import "./Noticias.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { useEffect, useState } from "react"


import ConfirmModal from "../components/admin/ConfirmModal"
import { deleteNoticia } from "../services/api"

export default function Noticias() {

  const navigate = useNavigate()

  const [noticias, setNoticias] = useState<any[]>([])


  const [modalOpen, setModalOpen] = useState(false)
const [selectedId, setSelectedId] = useState<string | null>(null)

const handleDelete = async () => {
  if (!selectedId) return

  await deleteNoticia(selectedId)

  setNoticias(prev => prev.filter(n => n.id !== selectedId))

  setModalOpen(false)
} 


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/noticias`)
      .then(res => res.json())
      .then(data => setNoticias(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Notícias</h1>
            <p>Gerencie as notícias do portal</p>
          </div>

          <Link to="/noticias/nova" className="btn btn--primary">
            <FiPlus />
            Nova notícia
          </Link>

        </div>

        <div className="adminTable">

          {noticias.map((noticia) => (

            <div key={noticia.id} className="adminTable__row">

              <div className="adminTable__title">
                {noticia.titulo}
              </div>

              <div className="adminTable__category">
                {noticia.categoria || "Sem categoria"}
              </div>

              <div className="adminTable__actions">

                <button
  className="iconBtn"
  onClick={() => navigate(`/noticias/editar/${noticia.id}`)}
>
  <FiEdit />
</button>

                <button
  className="iconBtn danger"
  onClick={() => {
    setSelectedId(noticia.id)
    setModalOpen(true)
  }}
>
  <FiTrash />
</button>

              </div>

            </div>

          ))}

        </div>

        <ConfirmModal
  open={modalOpen}
  title="Excluir notícia"
  message="Tem certeza que deseja excluir esta notícia?"
  onConfirm={handleDelete}
  onCancel={() => setModalOpen(false)}
/>

      </main>

    </AdminLayout>

    
  )
}