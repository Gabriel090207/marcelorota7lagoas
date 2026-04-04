import "./NoticiaDetalhe.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getNoticiaBySlug } from "../services/api"

import { FiArrowLeft, FiX, FiShare2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import { Helmet } from "react-helmet-async"

export default function NoticiaDetalhe() {

  const navigate = useNavigate()

  const { slug } = useParams()
  const [noticia, setNoticia] = useState<any>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)


  const handleShare = () => {

  const previewUrl = `https://rota7-backend.onrender.com/noticias/preview/${noticia.slug || noticia.id}`

  const texto = noticia.titulo

  // 🔥 MENU NATIVO (celular)
  if (navigator.share) {
    navigator.share({
      title: noticia.titulo,
      text: texto,
      url: previewUrl
    })
    return
  }

  // 🔥 fallback (PC)
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto + "\n\n" + previewUrl)}`
  window.open(whatsappUrl, "_blank")
}

  // 🔥 BUSCA POR SLUG
  useEffect(() => {
    if (slug) {
      getNoticiaBySlug(slug).then((data) => {
        console.log("IMAGEM:", data.imagem)
        setNoticia(data)
      })
    }
  }, [slug])

  if (!noticia) {
    return <p style={{ padding: 40 }}>Carregando...</p>
  }

  return (
    <main className="noticiaDetalhe">

      <Helmet>
        <title>{noticia.titulo}</title>

        <meta property="og:title" content={noticia.titulo} />
        <meta property="og:description" content={noticia.conteudo.replace(/<[^>]+>/g, "").slice(0, 150)} />
        <meta property="og:image" content={noticia.imagem} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>

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

      {/* LEGENDA CAPA */}
      {noticia.legendaCapa && (
        <div className="noticiaDetalhe__legendaWrapper">
          <span className="noticiaDetalhe__legendaCapa">
            {noticia.legendaCapa}
          </span>
        </div>
      )}

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

                {noticia.legendas && noticia.legendas[index] && (
                  <span className="noticiaDetalhe__legenda">
                    {noticia.legendas[index]}
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
              const index = noticia.imagens.findIndex((img: string) => img === selectedImg)
              return noticia.legendas && noticia.legendas[index] ? (
                <span className="galeriaModalLegenda">
                  {noticia.legendas[index]}
                </span>
              ) : null
            })()}
          </div>

        </div>
      )}

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

    </main>
  )
}