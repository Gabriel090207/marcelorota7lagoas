import "./BlogDetalhe.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  FiArrowLeft,
  FiX,
  FiShare2,
  FiTrash,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi"
import { getBlogBySlug, getComentariosByBlog } from "../services/api"
import { createComentario } from "../services/api"

import { Helmet } from "react-helmet-async"


import ConfirmModal from "../components/ConfirmModal/ConfirmModal"

export default function BlogDetalhe() {

  const [comentarios, setComentarios] = useState<any[]>([])
const [novoComentario, setNovoComentario] = useState("")
const [showAllComentarios, setShowAllComentarios] = useState(false)

const [modalOpen, setModalOpen] = useState(false)
const [selectedComentario, setSelectedComentario] = useState<string | null>(null)
const [user, setUser] = useState<any>(null)

  const { slug } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<any>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<"success" | "error">("success")
const [toastMessage, setToastMessage] = useState("")

const handleShare = () => {

  const previewUrl = `https://rota7-backend.onrender.com/blogs/preview/${blog.slug || blog.id}`

  const texto = `*${blog.titulo}*\n\n${previewUrl}`

  // 📱 CELULAR
  if (navigator.share) {
    navigator.share({
      text: texto
    })
    return
  }

  // 💻 PC
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`
  window.open(whatsappUrl, "_blank")
}




const handleComentar = async () => {
  console.log("clicou comentar")

  const user = JSON.parse(localStorage.getItem("portalUser") || "null")
  console.log("user:", user)

  if (!user) {
    console.log("não logado")
    window.dispatchEvent(new Event("openLoginModal"))
    return
  }

  if (!novoComentario.trim()) {
    console.log("comentário vazio")
    return
  }

  try {
    const res = await createComentario({
      blogId: blog.slug || blog.id,
      userId: user.id,
      nome: user.nome,
      comentario: novoComentario
    })

    console.log("resposta backend:", res)

    if (!res || res.erro) {
      console.log("erro backend:", res)
      return
    }

    setNovoComentario("")
showToast("success", "Comentário enviado para aprovação.")

  } catch (err) {
    console.error("ERRO AO ENVIAR:", err)
  }
}


useEffect(() => {
  if (!slug) return

  // 🔥 pega usuário ao carregar
  const storedUser = JSON.parse(localStorage.getItem("portalUser") || "null")
  setUser(storedUser)

  // 🔥 busca blog + comentários
  getBlogBySlug(slug)
    .then((data) => {
      setBlog(data)
      return getComentariosByBlog(data.slug || data.id)
    })
    .then(setComentarios)
    .catch(console.error)

  // 🔥 escuta login sem reload
  const handleLogin = () => {
    const updatedUser = JSON.parse(localStorage.getItem("portalUser") || "null")
    setUser(updatedUser)
  }

  window.addEventListener("loginSuccess", handleLogin)

  return () => {
    window.removeEventListener("loginSuccess", handleLogin)
  }

}, [slug])

  if (!blog) {
    return <div style={{ padding: 40 }}>Carregando...</div>
  }


  const handleDeleteComentario = async () => {
  if (!selectedComentario) return

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/comentarios/${selectedComentario}`, {
      method: "DELETE"
    })

    setComentarios(prev => prev.filter(c => c.id !== selectedComentario))

    setModalOpen(false)

  } catch (err) {
    console.error("Erro ao deletar comentário", err)
  }
}

  

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

  return (
    <main className="blogDetalhe">

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
  <title>{blog.titulo}</title>

  <meta property="og:title" content={blog.titulo} />
  <meta property="og:description" content={blog.conteudo.replace(/<[^>]+>/g, "").slice(0, 150)} />
  <meta property="og:image" content={blog.imagem} />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:type" content="article" />
</Helmet>
      

      {/* VOLTAR */}
      <div className="blogDetalhe__back" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      {/* HERO */}
      <section
        className="blogDetalhe__hero"
        style={{
          backgroundImage: `url(${blog.imagem || ""})`
        }}
      >
        <div className="blogDetalhe__overlay">

          <span className="blogDetalhe__categoria">
            {blog.categoria}
          </span>

          <h1>{blog.titulo}</h1>

          <span className="blogDetalhe__autor">
            Por {blog.autor || "Marcelão"}
          </span>

        </div>
      </section>

      {/* LEGENDA CAPA */}
      {blog.legendaCapa && (
        <div className="noticiaDetalhe__legendaWrapper">
          <span className="noticiaDetalhe__legendaCapa">
            {blog.legendaCapa}
          </span>
        </div>
      )}

      {/* CONTEÚDO */}
      <section className="blogDetalhe__content">
        <div
          className="blogDetalhe__texto"
          dangerouslySetInnerHTML={{ __html: blog.conteudo }}
        />
      </section>

      {/* GALERIA */}
      {blog.imagens && blog.imagens.length > 0 && (
        <section className="blogDetalhe__galeria">

          <h3>Galeria</h3>

          <div className="blogDetalhe__grid">

            {blog.imagens.map((img: string, index: number) => (
              <div
                key={index}
                className="blogDetalhe__item"
                onClick={() => setSelectedImg(img)}
              >
                <img src={img} alt={`Imagem ${index}`} />

                {blog.legendas && blog.legendas[index] && (
                  <span className="noticiaDetalhe__legenda">
                    {blog.legendas[index]}
                  </span>
                )}
              </div>
            ))}

          </div>

        </section>
      )}

      {/* MODAL */}
      {selectedImg && (
        <div className="galeriaModal">

          <div
            className="galeriaOverlay"
            onClick={() => setSelectedImg(null)}
          />

          <button
            className="galeriaClose"
            onClick={() => setSelectedImg(null)}
          >
            <FiX size={22} />
          </button>

          <div className="galeriaModalContent">
            <img src={selectedImg} alt="" />

            {(() => {
              const index = blog.imagens.findIndex((img: string) => img === selectedImg)
              return blog.legendas && blog.legendas[index] ? (
                <span className="galeriaModalLegenda">
                  {blog.legendas[index]}
                </span>
              ) : null
            })()}
          </div>

        </div>
      )}


   <section className="comentarios">

  <h3>{comentarios.length} Comentários</h3>

  {/* INPUT */}
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

  {/* LISTA */}
  <div className="comentariosLista">

  {(showAllComentarios ? comentarios : comentarios.slice(0, 3)).map((c) => {

  const isOwner = user && user.id === c.userId

    return (
      <div key={c.id} className="comentarioItem">

        <div className="comentarioAvatar">
          {c.nome?.substring(0, 2).toUpperCase()}
        </div>

        <div className="comentarioConteudo">

          <div className="comentarioHeader">

            <span className="comentarioNome">{c.nome}</span>

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

{/* BOTÃO VER MAIS */}
{comentarios.length > 3 && (
  <div className="comentariosToggle">
    <button onClick={() => setShowAllComentarios(!showAllComentarios)}>
      {showAllComentarios
        ? "Ocultar comentários"
        : `Ver todos (${comentarios.length})`}
    </button>
  </div>
)}
 


</section>


      {/* SHARE */}
      <div className="noticiaDetalhe__share">
        <button
          className="shareBtn"
          onClick={handleShare}
        >
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