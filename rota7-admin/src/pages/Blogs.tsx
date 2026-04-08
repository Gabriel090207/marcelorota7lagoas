import AdminLayout from "../components/admin/AdminLayout"
import { Link, useNavigate } from "react-router-dom"
import "./Noticias.css"

import { FiPlus, FiEdit, FiTrash, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"
import { useEffect, useState } from "react"

import ConfirmModal from "../components/admin/ConfirmModal"

export default function Blogs() {

  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<any[]>([])

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
    await fetch(`${import.meta.env.VITE_API_URL}/blogs/${selectedId}`, {
      method: "DELETE"
    })

    setBlogs(prev => prev.filter(b => b.id !== selectedId))

    setModalOpen(false)

    showToast("success", "Blog deletado com sucesso!")

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao deletar blog.")
  }
}

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])



  const blogsOrdenados = [...blogs].sort((a, b) => {
  const dateA = a.data
    ? new Date(a.data).getTime()
    : new Date(a.created_at || 0).getTime()

  const dateB = b.data
    ? new Date(b.data).getTime()
    : new Date(b.created_at || 0).getTime()

  return dateB - dateA
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
            <h1>Blogs</h1>
            <p>Gerencie os blogs do Marcelão</p>
          </div>

          <Link to="/blogs/novo" className="btn btn--primary">
            <FiPlus />
            Novo blog
          </Link>

        </div>

        <div className="adminTable">

          {Array.isArray(blogsOrdenados) && blogsOrdenados.map((blog) => (

            <div key={blog.id} className="adminTable__row">

              <div className="adminTable__title">
                {blog.titulo}
              </div>

              <div className="adminTable__category">
                {blog.categoria || "Sem categoria"}
              </div>

              <div className="adminTable__actions">

                <button
                  className="iconBtn"
                  onClick={() => navigate(`/blogs/editar/${blog.id}`)}
                >
                  <FiEdit />
                </button>

                <button
                  className="iconBtn danger"
                  onClick={() => {
                    setSelectedId(blog.id)
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
          title="Excluir blog"
          message="Tem certeza que deseja excluir este blog?"
          onConfirm={handleDelete}
          onCancel={() => setModalOpen(false)}
        />

      </main>

    </AdminLayout>
  )
}