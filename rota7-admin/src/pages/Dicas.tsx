import AdminLayout from "../components/admin/AdminLayout"
import "./Dicas.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Dicas() {

  const dicas = [
    {
      id: 1,
      titulo: "Como pilotar com segurança na chuva",
      categoria: "Pilotagem"
    },
    {
      id: 2,
      titulo: "Manutenção básica antes de viajar",
      categoria: "Manutenção"
    }
  ]

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Dicas</h1>
            <p>Gerencie as dicas de pilotagem e manutenção</p>
          </div>

          <Link to="/dicas/nova" className="btn btn--primary">
            <FiPlus />
            Nova dica
          </Link>

        </div>

        <div className="adminTable">

          {dicas.map(dica => (

            <div key={dica.id} className="adminTable__row">

              <div className="adminTable__title">
                {dica.titulo}
              </div>

              <div className="adminTable__category">
                {dica.categoria}
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