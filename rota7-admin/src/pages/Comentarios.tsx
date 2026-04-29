import AdminLayout from "../components/admin/AdminLayout"
import "./Comentarios.css"

import { useEffect, useState } from "react"

import {
  getComentariosPendentes,
  aprovarComentario,
  rejeitarComentario,
  getBlogs,
  getNoticias,
  getDicas
} from "../services/api"

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [noticias, setNoticias] = useState<any[]>([])
  const [dicas, setDicas] = useState<any[]>([])

  const loadComentarios = () => {
    getComentariosPendentes()
      .then(setComentarios)
      .catch(console.error)
  }

  useEffect(() => {
    loadComentarios()

    getBlogs().then(setBlogs).catch(console.error)
    getNoticias().then(setNoticias).catch(console.error)
    getDicas().then(setDicas).catch(console.error)

  }, [])

  const handleAprovar = async (id: string) => {
    await aprovarComentario(id)
    setComentarios(prev => prev.filter(item => item.id !== id))
  }

  const handleRejeitar = async (id: string) => {
    await rejeitarComentario(id)
    setComentarios(prev => prev.filter(item => item.id !== id))
  }

  const getOrigem = (item: any) => {
    const id = item.blogId

    const blog = blogs.find((x) => x.id === id)
    if (blog) {
      return {
        tipo: "Blog",
        titulo: blog.titulo
      }
    }

    const noticia = noticias.find((x) => x.id === id)
    if (noticia) {
      return {
        tipo: "Notícia",
        titulo: noticia.titulo
      }
    }

    const dica = dicas.find((x) => x.id === id)
    if (dica) {
      return {
        tipo: "Dica",
        titulo: dica.titulo
      }
    }

    return {
      tipo: "Conteúdo",
      titulo: id
    }
  }

  return (
    <AdminLayout>
      <main className="comentariosPage">

        <div className="comentariosHeader">
          <div>
            <h1>Comentários</h1>
            <p>Aprove ou rejeite comentários enviados no portal</p>
          </div>
        </div>

        <div className="comentariosList">

          {comentarios.map((item) => {
            const origem = getOrigem(item)

            return (
              <div key={item.id} className="comentarioCard">

                <div className="comentarioBody">

                  <div className="comentarioField">
                    <span>Nome</span>
                    <strong>{item.nome}</strong>
                  </div>

                  <div className="comentarioField">
                    <span>Comentário</span>
                    <p>{item.comentario}</p>
                  </div>

                  <div className="comentarioField">
                    <span>{origem.tipo}</span>
                    <strong className="blogTitle">
                      {origem.titulo}
                    </strong>
                  </div>

                </div>

                <div className="comentarioActions">

                  <button
                    className="btn approve"
                    onClick={() => handleAprovar(item.id)}
                  >
                    Aprovar
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => handleRejeitar(item.id)}
                  >
                    Rejeitar
                  </button>

                </div>

              </div>
            )
          })}

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