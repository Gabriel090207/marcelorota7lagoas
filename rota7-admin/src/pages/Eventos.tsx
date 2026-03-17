import AdminLayout from "../components/admin/AdminLayout"
import "./Eventos.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Eventos() {

  const eventos = [
    {
      id: 1,
      titulo: "Encontro Rota 7 Lagoas",
      data: "12 OUT",
      local: "Praça Central"
    },
    {
      id: 2,
      titulo: "Passeio Serra do Espinhaço",
      data: "19 OUT",
      local: "Posto X"
    },
    {
      id: 3,
      titulo: "Trilha Off-road Regional",
      data: "02 NOV",
      local: "Espinhaço"
    }
  ]

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

          {eventos.map(evento => (

            <div key={evento.id} className="eventRow">

              <div className="eventDate">
                {evento.data}
              </div>

              <div className="eventInfo">

                <h3>{evento.titulo}</h3>
                <p>{evento.local}</p>

              </div>

              <div className="adminTable__actions">

                <button className="iconBtn">
                  <FiEdit />
                </button>

                <button className="iconBtn danger">
                  <FiTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </AdminLayout>
  )
}