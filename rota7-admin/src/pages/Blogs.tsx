import AdminLayout from "../components/admin/AdminLayout"
import { Link, useNavigate } from "react-router-dom"
import "./Noticias.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { useEffect, useState } from "react"

import ConfirmModal from "../components/admin/ConfirmModal"

export default function Blogs() {

  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<any[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!selectedId) return

    await fetch(`${import.meta.env.VITE_API_URL}/blogs/${selectedId}`, {
      method: "DELETE"
    })

    setBlogs(prev => prev.filter(b => b.id !== selectedId))
    setModalOpen(false)
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

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

          {Array.isArray(blogs) && blogs.map((blog) => (

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