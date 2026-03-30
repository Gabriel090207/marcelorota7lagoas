import "./BlogDetalhe.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { getBlogById } from "../services/api"

export default function BlogDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<any>(null)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    getBlogById(id)
      .then(setBlog)
      .catch(console.error)
  }, [id])

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
              </div>
            ))}

          </div>

        </section>
      )}

      {/* MODAL IGUAL GALERIA */}
      {selectedImg && (
        <div className="galeriaModal">

          {/* OVERLAY */}
          <div
            className="galeriaOverlay"
            onClick={() => setSelectedImg(null)}
          />

          {/* FECHAR */}
          <button
            className="galeriaClose"
            onClick={() => setSelectedImg(null)}
          >
            <FiX size={22} />
          </button>

          {/* IMAGEM */}
          <div className="galeriaModalContent">
            <img src={selectedImg} alt="" />
          </div>

        </div>
      )}

    </main>
  )
}