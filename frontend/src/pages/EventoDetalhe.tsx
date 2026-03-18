import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { getEventos } from "../services/api"

import { FiArrowLeft } from "react-icons/fi"

import "./EventoDetalhe.css"

export default function EventoDetalhe() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [evento, setEvento] = useState<any | null>(null)

  // 🔥 parse correto
  const parseEventoDate = (dataStr: string) => {
    if (!dataStr) return null

    const [datePart, timePart] = dataStr.split(" ")

    const [day, month, year] = datePart.split("/")
    const [hour = "00", minute = "00"] = (timePart || "").split(":")

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    )
  }

  useEffect(() => {
    getEventos().then((data) => {
      const found = data.find((e: any) => e.id === id)
      setEvento(found)
    })
  }, [id])

  if (!evento) {
    return <div className="eventoDetalhe loading">Carregando...</div>
  }

  const date = parseEventoDate(evento.data)

  return (
    <main className="eventoDetalhe">

      {/* VOLTAR */}
      <div className="eventoDetalhe__back" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      {/* CAPA */}
      <div
        className="eventoDetalhe__cover"
        style={{ backgroundImage: `url(${evento.imagem})` }}
      />

      {/* CONTEÚDO */}
      <div className="eventoDetalhe__content">

        <h1>{evento.titulo}</h1>

        <div className="eventoDetalhe__meta">
          <span>
            {date?.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })}
          </span>

          <span>•</span>

          <span>
            {date?.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>

          <span>•</span>

          <span>{evento.local}</span>
        </div>

        <p className="eventoDetalhe__descricao">
          {evento.descricao}
        </p>

      </div>

    </main>
  )
}