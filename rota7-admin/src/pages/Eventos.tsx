import AdminLayout from "../components/admin/AdminLayout"
import "./Eventos.css"

import { FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { getEventos, deleteEvento } from "../services/api"

import ConfirmModal from "../components/admin/ConfirmModal"

export default function Eventos() {

  const navigate = useNavigate()

  const [eventos, setEventos] = useState<any[]>([])
  const [solicitacoes, setSolicitacoes] = useState<any[]>([])
  const [abaAtiva, setAbaAtiva] = useState<"eventos" | "solicitacoes">("eventos")

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // 🔥 FUNÇÃO UNIVERSAL DE DATA
  function parseEventoDate(dataStr: string) {
    if (!dataStr) return new Date(0)

    if (dataStr.includes("T")) {
      const d = new Date(dataStr)
      return isNaN(d.getTime()) ? new Date(0) : d
    }

    try {
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
    } catch {
      return new Date(0)
    }
  }

  useEffect(() => {
    getEventos().then((data) => {

      const ordenados = [...data].sort((a: any, b: any) => {
        const dateA = parseEventoDate(a.data).getTime()
        const dateB = parseEventoDate(b.data).getTime()

        return dateA - dateB
      })

      setEventos(ordenados)
    })
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const eventos = data.filter((item: any) => item.tipo === "evento")
          setSolicitacoes(eventos)
        } else {
          setSolicitacoes([])
        }
      })
      .catch(err => {
        console.error(err)
        setSolicitacoes([])
      })
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return

    try {
      await deleteEvento(selectedId)

      setEventos(prev => prev.filter(e => e.id !== selectedId))
      setModalOpen(false)

    } catch (error) {
      console.error(error)
    }
  }

  const formatarData = (dataStr: string) => {
    const date = parseEventoDate(dataStr)

    if (isNaN(date.getTime())) {
      return { dia: "--", mes: "---", hora: "--:--" }
    }

    const dia = String(date.getDate()).padStart(2, "0")

    const meses = [
      "JAN","FEV","MAR","ABR","MAI","JUN",
      "JUL","AGO","SET","OUT","NOV","DEZ"
    ]

    const mes = meses[date.getMonth()]

    const hora = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`

    return { dia, mes, hora }
  }

  return (
    <AdminLayout>

      <main className="adminPage">

        {/* HEADER */}
        <div className="adminPage__header">
          <div>
            <h1>Eventos</h1>
            <p>Gerencie os eventos do portal</p>
          </div>

          <Link to="/eventos/novo" className="btn btn--primary">
            <FiPlus />
            Novo evento
          </Link>
        </div>

        {/* TABS */}
        <div className="adminTabs">
          <button
            className={`adminTab ${abaAtiva === "eventos" ? "active" : ""}`}
            onClick={() => setAbaAtiva("eventos")}
          >
            Eventos
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>
        </div>

        {/* ================= EVENTOS ================= */}
        {abaAtiva === "eventos" && (
          <div className="eventsList">

            {eventos.map(evento => {

              const { dia, mes, hora } = formatarData(evento.data)

              return (
                <div key={evento.id} className="eventItem">

                  <div className="eventDate">
                    <span className="eventDay">{dia}</span>
                    <span className="eventMonth">{mes}</span>
                  </div>

                  <div className="eventInfo">
                    <h3>{evento.titulo}</h3>
                    <p>{evento.local} • {hora}</p>
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/eventos/editar/${evento.id}`)}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="iconBtn danger"
                      onClick={() => {
                        setSelectedId(evento.id)
                        setModalOpen(true)
                      }}
                    >
                      <FiTrash />
                    </button>

                  </div>

                </div>
              )
            })}

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
                    {s.titulo}
                  </div>

                  <div className="adminTable__category">
                    {s.local}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/eventos/solicitacoes/${s.id}`)}
                    >
                      <FiEye />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>
        )}

        {/* MODAL */}
        <ConfirmModal
          open={modalOpen}
          title="Excluir evento"
          message="Tem certeza que deseja excluir este evento?"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}