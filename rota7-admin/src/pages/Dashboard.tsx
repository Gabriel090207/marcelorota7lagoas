import AdminLayout from "../components/admin/AdminLayout"
import "./Dashboard.css"

import { useEffect, useState } from "react"

import {
  FiFileText,
  FiTool,
  FiUsers,
  FiImage,
} from "react-icons/fi"

import {
  getNoticias,
  getDicas,
  getEventos,
  getParceiros,
  getImagens
} from "../services/api"

export default function Dashboard() {

  const [showToast, setShowToast] = useState(false)

  const [noticias, setNoticias] = useState<any[]>([])
  const [dicas, setDicas] = useState<any[]>([])
  const [eventos, setEventos] = useState<any[]>([])
  const [parceiros, setParceiros] = useState<any[]>([])
  const [galeria, setGaleria] = useState<any[]>([])

  useEffect(() => {
    const login = localStorage.getItem("loginSucesso")

    if (login) {
      setShowToast(true)
      localStorage.removeItem("loginSucesso")

      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }, [])

  // 🔥 PARSE UNIVERSAL
  const parseEventoDate = (dataStr: string) => {
    if (!dataStr) return null

    if (dataStr.includes("T")) {
      const d = new Date(dataStr)
      return isNaN(d.getTime()) ? null : d
    }

    try {
      const [datePart, timePart] = dataStr.split(" ")
      const [day, month, year] = datePart.split("/")
      const [hour = "00", minute = "00"] = (timePart || "").split(":")

      const d = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
      )

      return isNaN(d.getTime()) ? null : d
    } catch {
      return null
    }
  }

  useEffect(() => {

    Promise.all([
  getNoticias(),
  getDicas(),
  getEventos(),
  getParceiros(),
  getImagens()
]).then(([noticiasData, dicasData, eventosData, parceirosData, imagensData]) => {


      setNoticias(noticiasData || [])
      setDicas(dicasData || [])
      setParceiros(parceirosData || [])
setGaleria(imagensData || [])

      const eventosFormatados = eventosData
        .map((e: any) => ({
          ...e,
          date: parseEventoDate(e.data)
        }))
        .filter((e: any) => e.date)

      const ordenados = [...eventosFormatados].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )

      const proximos = ordenados
        .filter(e => e.date >= new Date())
        .slice(0, 3)

      setEventos(proximos)
    })

  }, [])

  // 🔥 FORMATAR DATA
  const formatarData = (date: Date) => {

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
    <>
      <AdminLayout>

        <main className="dashboard">

          <div className="dashboard__header">
            <h1>Painel Administrativo</h1>
            <p>Resumo do portal Rota 7 Lagoas</p>
          </div>

          {/* STATS */}

          <div className="dashboard__stats">

            <div className="statCard">
              <FiFileText className="statIcon"/>
              <div>
                <h3>Notícias</h3>
                <span>{noticias.length} publicadas</span>
              </div>
            </div>

            <div className="statCard">
              <FiTool className="statIcon"/>
              <div>
                <h3>Dicas</h3>
                <span>{dicas.length} artigos</span>
              </div>
            </div>

            <div className="statCard">
              <FiUsers className="statIcon"/>
              <div>
                <h3>Parceiros</h3>
<span>{parceiros.length} cadastrados</span>
              </div>
            </div>

            <div className="statCard">
              <FiImage className="statIcon"/>
              <div>
               <h3>Galeria</h3>
<span>{galeria.length} imagens</span>
              </div>
            </div>

          </div>

          {/* EVENTOS */}

          <div className="dashboard__events">

            <div className="dashboard__sectionHeader">
              <h2>Próximos eventos</h2>
            </div>

            <div className="eventsList">

              {eventos.map(evento => {

                const { dia, mes, hora } = formatarData(evento.date)

                return (
                  <div key={evento.id} className="eventItem">

                    {/* DATA */}
                    <div className="eventDate">
                      <span className="eventDay">{dia}</span>
                      <span className="eventMonth">{mes}</span>
                    </div>

                    {/* INFO */}
                    <div className="eventInfo">
                      <h3>{evento.titulo}</h3>
                      <p>
                        {hora} • {evento.local}
                      </p>
                    </div>

                  </div>
                )
              })}

            </div>

          </div>

        </main>

      </AdminLayout>

      {showToast && (
        <div className="toast">
          Login realizado com sucesso
        </div>
      )}
    </>
  )
}