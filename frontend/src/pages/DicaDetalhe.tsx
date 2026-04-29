import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  getDicaBySlug,
  getComentariosByBlog,
  createComentario
} from "../services/api"

import {
  FiArrowLeft,
  FiShare2,
  FiTrash,
  FiX,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi"

import { Helmet } from "react-helmet-async"
import ConfirmModal from "../components/ConfirmModal/ConfirmModal"

import "./DicaDetalhe.css"

export default function DicaDetalhe() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [dica, setDica] = useState<any>(null)

  const [comentarios, setComentarios] = useState<any[]>([])
  const [novoComentario, setNovoComentario] = useState("")
  const [showAllComentarios, setShowAllComentarios] = useState(false)

  const [user, setUser] = useState<any>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedComentario, setSelectedComentario] = useState<string | null>(null)

  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 3000)
  }

  const handleShare = () => {
    const previewUrl = `https://rota7-backend.onrender.com/dicas/preview/${dica.slug || dica.id}`

    const texto = `*${dica.titulo}*\n\n${previewUrl}`

    if (navigator.share) {
      navigator.share({ text: texto })
      return
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleComentar = async () => {
    const user = JSON.parse(localStorage.getItem("portalUser") || "null")

    if (!user) {
      window.dispatchEvent(new Event("openLoginModal"))
      return
    }

    if (!novoComentario.trim()) return

    try {
      const res = await createComentario({
        blogId: dica.slug || dica.id,
        userId: user.id,
        nome: user.nome,
        comentario: novoComentario
      })

      if (!res || res.erro) {
        showToast("error", "Erro ao enviar comentário.")
        return
      }

      setNovoComentario("")
      showToast("success", "Comentário enviado para aprovação.")

    } catch (err) {
      console.error(err)
      showToast("error", "Erro ao enviar comentário.")
    }
  }

  const handleDeleteComentario = async () => {
    if (!selectedComentario) return

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/comentarios/${selectedComentario}`,
        { method: "DELETE" }
      )

      setComentarios(prev =>
        prev.filter(c => c.id !== selectedComentario)
      )

      setModalOpen(false)

      showToast("success", "Comentário removido.")

    } catch (err) {
      console.error(err)
      showToast("error", "Erro ao remover comentário.")
    }
  }

  useEffect(() => {
    if (!slug) return

    getDicaBySlug(slug)
      .then((data) => {
        setDica(data)

        return getComentariosByBlog(data.slug || data.id)
      })
      .then(setComentarios)
      .catch(console.error)

    const storedUser = JSON.parse(localStorage.getItem("portalUser") || "null")
    setUser(storedUser)

    const handleLogin = () => {
      const updatedUser = JSON.parse(localStorage.getItem("portalUser") || "null")
      setUser(updatedUser)
    }

    window.addEventListener("loginSuccess", handleLogin)

    return () => {
      window.removeEventListener("loginSuccess", handleLogin)
    }

  }, [slug])

  if (!dica) {
    return <div style={{ padding: 40 }}>Carregando...</div>
  }

  return (
    <main className="dicaDetalhe">

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

      <Helmet>
        <title>{dica.titulo}</title>

        <meta property="og:title" content={dica.titulo} />
        <meta property="og:description" content={dica.conteudo.replace(/<[^>]+>/g, "").slice(0, 150)} />
        <meta property="og:image" content={dica.imagem} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="dicaDetalhe__back" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      <div className="dicaDetalhe__header">

        <span className="dicaDetalhe__categoria">
          {dica.categoria}
        </span>

        <h1>{dica.titulo}</h1>

      </div>

      <div
        className="dicaDetalhe__content"
        dangerouslySetInnerHTML={{ __html: dica.conteudo }}
      />

      <section className="comentarios">

        <h3>{comentarios.length} Comentários</h3>

        <div className="comentarioInput">

          <input
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
          />

          <button onClick={handleComentar}>
            Comentar
          </button>

        </div>

        <div className="comentariosLista">

          {(showAllComentarios
            ? comentarios
            : comentarios.slice(0, 3)
          ).map((c) => {
            const isOwner = user && user.id === c.userId

            return (
              <div key={c.id} className="comentarioItem">

                <div className="comentarioAvatar">
                  {c.nome?.substring(0, 2).toUpperCase()}
                </div>

                <div className="comentarioConteudo">

                  <div className="comentarioHeader">

                    <span className="comentarioNome">
                      {c.nome}
                    </span>

                    {isOwner && (
                      <button
                        className="comentarioDelete"
                        onClick={() => {
                          setSelectedComentario(c.id)
                          setModalOpen(true)
                        }}
                      >
                        <FiTrash size={12} />
                      </button>
                    )}

                  </div>

                  <p>{c.comentario}</p>

                </div>

              </div>
            )
          })}

        </div>

        {comentarios.length > 3 && (
          <div className="comentariosToggle">
            <button
              onClick={() =>
                setShowAllComentarios(!showAllComentarios)
              }
            >
              {showAllComentarios
                ? "Ocultar comentários"
                : `Ver todos (${comentarios.length})`}
            </button>
          </div>
        )}

      </section>

      <div className="noticiaDetalhe__share">
        <button className="shareBtn" onClick={handleShare}>
          <FiShare2 size={18} />
          <span>Compartilhar</span>
        </button>
      </div>

      <ConfirmModal
        open={modalOpen}
        title="Excluir comentário"
        message="Tem certeza que deseja excluir este comentário?"
        onConfirm={handleDeleteComentario}
        onCancel={() => setModalOpen(false)}
      />

    </main>
  )
}