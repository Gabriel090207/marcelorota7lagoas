import "./NoticiaDetalhe.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getNoticiaById } from "../services/api"

import { FiArrowLeft, FiX } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function NoticiaDetalhe() {


  const navigate = useNavigate()

  const { id } = useParams()
  const [noticia, setNoticia] = useState<any>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      getNoticiaById(id).then(setNoticia)
    }
  }, [id])

  if (!noticia) {
    return <p style={{ padding: 40 }}>Carregando...</p>
  }

  return (
    <main className="noticiaDetalhe">

        <div className="noticiaDetalhe__back" onClick={() => navigate(-1)}>
  <FiArrowLeft size={18} />
  <span>Voltar</span>
</div>

      {/* HERO */}
      <section
        className="noticiaDetalhe__hero"
        style={{
          backgroundImage: `url(${noticia.imagem || ""})`
        }}
      >
        <div className="noticiaDetalhe__overlay">

          <span className="noticiaDetalhe__categoria">
            {noticia.categoria || "Notícia"}
          </span>

          <h1>{noticia.titulo}</h1>

          <span className="noticiaDetalhe__data">
            {new Date(noticia.data).toLocaleDateString("pt-BR")}
          </span>

        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="noticiaDetalhe__content">

        <div
          className="noticiaDetalhe__texto"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />

      </section>


      {/* GALERIA */}
{noticia.imagens && noticia.imagens.length > 0 && (
  <section className="noticiaDetalhe__galeria">

    <h3>Imagens</h3>

    <div className="noticiaDetalhe__grid">

      {noticia.imagens.map((img: string, index: number) => (
        <div
          key={index}
          className="noticiaDetalhe__item"
          onClick={() => setSelectedImg(img)}
        >
          <img src={img} alt={`Imagem ${index}`} />
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
    </div>

  </div>
)}

    </main>
  )
}