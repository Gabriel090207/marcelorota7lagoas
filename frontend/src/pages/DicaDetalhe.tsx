import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getDicaById } from "../services/api"
import { FiArrowLeft } from "react-icons/fi"

import "./DicaDetalhe.css"

export default function DicaDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [dica, setDica] = useState<any>(null)

  useEffect(() => {
    if (!id) return

    getDicaById(id)
      .then(setDica)
      .catch(console.error)
  }, [id])

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

    </main>
  )
}