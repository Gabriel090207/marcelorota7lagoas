import AdminLayout from "../components/admin/AdminLayout"
import "./Comentarios.css"

import { useEffect, useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"

import {
  getComentariosPendentes,
  aprovarComentario,
  rejeitarComentario
} from "../services/api"

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<any[]>([])

  const loadComentarios = () => {
    getComentariosPendentes()
      .then(setComentarios)
      .catch(console.error)
  }

  useEffect(() => {
    loadComentarios()
  }, [])

  const handleAprovar = async (id: string) => {
    await aprovarComentario(id)
    setComentarios(prev => prev.filter((item) => item.id !== id))
  }

  const handleRejeitar = async (id: string) => {
    await rejeitarComentario(id)
    setComentarios(prev => prev.filter((item) => item.id !== id))
  }

  return (
    <AdminLayout>
      <main className="adminPage">

        <div className="adminPage__header">
          <div>
            <h1>Comentários</h1>
            <p>Aprove ou rejeite comentários enviados no blog</p>
          </div>
        </div>

        <div className="adminTable">

          {comentarios.map((item) => (
            <div key={item.id} className="adminTable__row comentarioRow">

              <div className="comentarioInfo">
                <strong>{item.nome}</strong>
                <span>{item.comentario}</span>
                <small>Blog: {item.blogId}</small>
              </div>

              <div className="adminTable__actions">

                <button
                  className="iconBtn success"
                  onClick={() => handleAprovar(item.id)}
                >
                  <FiCheck />
                </button>

                <button
                  className="iconBtn danger"
                  onClick={() => handleRejeitar(item.id)}
                >
                  <FiX />
                </button>

              </div>

            </div>
          ))}

          {comentarios.length === 0 && (
            <div className="emptyState">
              Nenhum comentário pendente.
            </div>
          )}

        </div>

      </main>
    </AdminLayout>
  )
}