import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getDicaById } from "../services/api"
import { FiArrowLeft } from "react-icons/fi"
import { FiShare2 } from "react-icons/fi"

import { Helmet } from "react-helmet-async"

import "./DicaDetalhe.css"

export default function DicaDetalhe() {

const handleShare = () => {

  const previewUrl = `https://rota7-backend.onrender.com/dicas/preview/${dica.slug || dica.id}`
  
  const texto = `*${dica.titulo}*\n\n${previewUrl}`

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


  const { slug } = useParams()
  const navigate = useNavigate()

  const [dica, setDica] = useState<any>(null)

  useEffect(() => {
    if (!slug) return

getDicaById(slug)
      .then(setDica)
      .catch(console.error)
  }, [slug])

  if (!dica) {
    return <div style={{ padding: 40 }}>Carregando...</div>
  }

  return (
    <main className="dicaDetalhe">

      <Helmet>
  <title>{dica.titulo}</title>

  <meta property="og:title" content={dica.titulo} />
  <meta property="og:description" content={dica.conteudo.replace(/<[^>]+>/g, "").slice(0, 150)} />
  <meta property="og:image" content={dica.imagem} />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:type" content="article" />
</Helmet>

      {/* VOLTAR */}
      <div className="dicaDetalhe__back" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      {/* HEADER */}
      <div className="dicaDetalhe__header">

        <span className="dicaDetalhe__categoria">
          {dica.categoria}
        </span>

        <h1>{dica.titulo}</h1>

      </div>

     

      {/* CONTEÚDO */}
      <div
        className="dicaDetalhe__content"
        dangerouslySetInnerHTML={{ __html: dica.conteudo }}
      />


      <div className="noticiaDetalhe__share">
  <button className="shareBtn" onClick={handleShare}>
    <FiShare2 size={18} />
    <span>Compartilhar</span>
  </button>
</div>

    </main>
  )
}