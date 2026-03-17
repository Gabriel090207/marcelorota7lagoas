import AdminLayout from "../components/admin/AdminLayout"
import "./Parceiros.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Parceiros() {

  const parceiros = [
    {
      id: 1,
      nome: "Moto Center 7L",
      categoria: "Oficina"
    },
    {
      id: 2,
      nome: "Capacetes BH",
      categoria: "Equipamentos"
    }
  ]

  return (

    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Parceiros</h1>
            <p>Gerencie os parceiros do portal</p>
          </div>

          <Link to="/parceiros/novo" className="btn btn--primary">
            <FiPlus />
            Novo parceiro
          </Link>

        </div>

        <div className="adminTable">

          {parceiros.map(parceiro => (

            <div key={parceiro.id} className="adminTable__row">

              <div className="adminTable__title">
                {parceiro.nome}
              </div>

              <div className="adminTable__category">
                {parceiro.categoria}
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