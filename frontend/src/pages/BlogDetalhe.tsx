import "./BlogDetalhe.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FiArrowLeft, FiX, FiShare2 } from "react-icons/fi"
import { getBlogBySlug } from "../services/api"

export default function BlogDetalhe() {

  const { slug } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<any>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

const handleShare = () => {

  const previewUrl = `https://rota7-backend.onrender.com/blogs/preview/${blog.slug || blog.id}`

  const texto = `*${blog.titulo}*\n\n${previewUrl}`

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`

  window.open(whatsappUrl, "_blank")
}

  useEffect(() => {
    if (!slug) return

    getBlogBySlug(slug)
      .then(setBlog)
      .catch(console.error)

  }, [slug])

  if (!blog) {
    return <div style={{ padding: 40 }}>Carregando...</div>
  }

  return (
    <main className="blogDetalhe">

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