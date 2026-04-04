import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getDicaById } from "../services/api"
import { FiArrowLeft } from "react-icons/fi"
import { FiShare2 } from "react-icons/fi"

import "./DicaDetalhe.css"

export default function DicaDetalhe() {

  const handleShare = () => {

  const previewUrl = `https://rota7-backend.onrender.com/dicas/preview/${dica.slug || dica.id}`

  const texto = dica.titulo

  if (navigator.share) {
    navigator.share({
      title: dica.titulo,
      text: texto,
      url: previewUrl
    })
    return
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(texto + "\n\n" + previewUrl)}`
  window.open(whatsapp, "_blank")
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