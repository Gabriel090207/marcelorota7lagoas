import AdminLayout from "../components/admin/AdminLayout"
import "./Galeria.css"
import { Link, useNavigate } from "react-router-dom"

import { FiPlus, FiTrash, FiX, FiEye, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

import { useEffect, useState } from "react"
import { getImagens, deleteImagem } from "../services/api"

export default function Galeria() {

  const navigate = useNavigate()

  const [imagens, setImagens] = useState<any[]>([])
  const [solicitacoes, setSolicitacoes] = useState<any[]>([])
  const [selectedImg, setSelectedImg] = useState<any | null>(null)

  const [abaAtiva, setAbaAtiva] = useState<"galeria" | "solicitacoes">("galeria")

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
  // 🔥 carregar galeria
  useEffect(() => {
    getImagens().then(setImagens)
  }, [])

  // 🔥 carregar solicitações
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const fotos = data.filter((item: any) => item.tipo === "galeria")
          setSolicitacoes(fotos)
        } else {
          setSolicitacoes([])
        }
      })
      .catch(() => setSolicitacoes([]))
  }, [])

  const handleDelete = async (id: string) => {
  try {
    await deleteImagem(id)

    setImagens(prev => prev.filter(img => img.id !== id))

    showToast("success", "Imagem deletada com sucesso!")

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao deletar imagem.")
  }
}

const imagensOrdenadas = [...imagens].sort((a, b) => {
  return Number(b.created_at || 0) - Number(a.created_at || 0)
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

        {/* HEADER */}
        <div className="adminPage__header">

          <div>
            <h1>Galeria</h1>
            <p>Gerencie as fotos do portal</p>
          </div>

          <Link to="/galeria/nova" className="btn btn--primary">
            <FiPlus />
            Adicionar imagem
          </Link>

        </div>

        {/* ABAS */}
        <div className="adminTabs">

          <button
            className={`adminTab ${abaAtiva === "galeria" ? "active" : ""}`}
            onClick={() => setAbaAtiva("galeria")}
          >
            Galeria
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>

        </div>

        {/* ================= GALERIA ================= */}
        {abaAtiva === "galeria" && (

          <div className="galleryGrid">

            {imagens.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhuma imagem cadastrada
              </p>
            ) : (

             imagensOrdenadas.map(img => (
                  <div
  key={img.id}
  className="galleryCard"
  onClick={() => setSelectedImg(img)}
>

  <img
    src={img.url}
    alt={img.titulo || "Imagem"}
  />

  <div className="galleryOverlay">

    <span className="galleryCategory">
      {img.categoria}
    </span>

    <button
      className="iconBtn danger"
      onClick={(e) => {
        e.stopPropagation()
        handleDelete(img.id)
      }}
    >
      <FiTrash />
    </button>

  </div>

  {(img.titulo || img.subtitulo) && (
    <div className="galleryInfo">

      {img.titulo && (
        <h3>{img.titulo}</h3>
      )}

      {img.subtitulo && (
        <p>{img.subtitulo}</p>
      )}

    </div>
  )}

</div>

              ))

            )}

          </div>

        )}

        {/* ================= SOLICITAÇÕES ================= */}
        {abaAtiva === "solicitacoes" && (

          <div className="adminTable">

            {solicitacoes.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhuma solicitação pendente
              </p>
            ) : (

              solicitacoes.map((s) => (

                <div key={s.id} className="adminTable__row">

                  <div className="adminTable__title">
                    {s.titulo || "Sem título"}
                  </div>

                  <div className="adminTable__category">
                    {s.autor || "Usuário"}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/galeria/solicitacoes/${s.id}`)}
                    >
                      <FiEye />
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

        {/* MODAL IMAGEM */}
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

  <img
    src={selectedImg.url}
    alt={selectedImg.titulo || "Imagem"}
  />

  <div className="galeriaModalInfo">

    {selectedImg.titulo && (
      <h2>{selectedImg.titulo}</h2>
    )}

    {selectedImg.subtitulo && (
      <h4>{selectedImg.subtitulo}</h4>
    )}

    {selectedImg.legenda && (
      <p>{selectedImg.legenda}</p>
    )}

  </div>

</div>

          </div>
        )}

      </main>

    </AdminLayout>
  )
}



