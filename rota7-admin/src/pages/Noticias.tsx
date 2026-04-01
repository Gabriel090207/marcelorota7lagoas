import AdminLayout from "../components/admin/AdminLayout"
import { Link, useNavigate } from "react-router-dom"
import "./Noticias.css"

import { FiPlus, FiEdit, FiTrash, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"
import { useEffect, useState } from "react"


import ConfirmModal from "../components/admin/ConfirmModal"
import { deleteNoticia } from "../services/api"

export default function Noticias() {

  const navigate = useNavigate()

  const [noticias, setNoticias] = useState<any[]>([])


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

const handleDelete = async () => {
  if (!selectedId) return

  try {
    await deleteNoticia(selectedId)

    setNoticias(prev => prev.filter(n => n.id !== selectedId))

    setModalOpen(false)

    showToast("success", "Notícia deletada com sucesso!")

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao deletar notícia.")
  }
}

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/noticias`)
      .then(res => res.json())
      .then(data => setNoticias(data))
      .catch(err => console.error(err))
  }, [])


  const noticiasOrdenadas = [...noticias].sort((a, b) => {
  const dateA = new Date(a.data || a.created_at || 0).getTime()
  const dateB = new Date(b.data || b.created_at || 0).getTime()

  return dateB - dateA // 🔥 mais recente primeiro
})

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
            <h1>Notícias</h1>
            <p>Gerencie as notícias do portal</p>
          </div>

          <Link to="/noticias/nova" className="btn btn--primary">
            <FiPlus />
            Nova notícia
          </Link>

        </div>

        <div className="adminTable">

         {noticiasOrdenadas.map((noticia) => (

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