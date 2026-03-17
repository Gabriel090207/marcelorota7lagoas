import AdminLayout from "../components/admin/AdminLayout"
import "./Eventos.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Eventos() {

  const eventos = [
    {
      id: 1,
      titulo: "Teste",
      data: "03/03/2026 15:00",
      local: "Rua teste 123"
    }
  ]

  // 🔥 formatar data
  const formatarData = (dataStr: string) => {
    const [data, hora] = dataStr.split(" ")
    const [dia, mes] = data.split("/")

    const meses = [
      "JAN","FEV","MAR","ABR","MAI","JUN",
      "JUL","AGO","SET","OUT","NOV","DEZ"
    ]

    return {
      dia,
      mes: meses[Number(mes) - 1],
      hora
    }
  }

  return (
    <AdminLayout>

      <main className="adminPage">

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

        <div className="eventsTable">

          {eventos.map(evento => {

            const { dia, mes, hora } = formatarData(evento.data)

            return (

              <div key={evento.id} className="eventRow">

                {/* DATA */}
                <div className="eventDateBox">
                  <span className="eventDay">{dia}</span>
                  <span className="eventMonth">{mes}</span>
                </div>

                {/* INFO */}
                <div className="eventInfo">

                  <h3>{evento.titulo}</h3>

                  <p className="eventMeta">
                    {evento.local}
                    <span className="dot" />
                    {hora}
                  </p>

                </div>

                {/* AÇÕES */}
                <div className="adminTable__actions">

                  <button className="iconBtn">
                    <FiEdit />
                  </button>

                  <button className="iconBtn danger">
                    <FiTrash />
                  </button>

                </div>

              </div>

            )
          })}

        </div>

      </main>

    </AdminLayout>
  )
}