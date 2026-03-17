import { useState } from "react"
import AdminLayout from "../components/admin/AdminLayout"
import "./Parceiros.css"

import { FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Parceiros() {

    const [abaAtiva, setAbaAtiva] = useState<"parceiros" | "solicitacoes">("parceiros")

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


    const solicitacoes = [
    {
      id: 1,
      empresa: "Oficina Duas Rodas",
      categoria: "Oficina",
      responsavel: "Carlos Henrique",
      status: "Nova"
    },
    {
      id: 2,
      empresa: "Loja Trilha Moto Peças",
      categoria: "Peças",
      responsavel: "Fernanda Souza",
      status: "Pendente"
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

               <div className="adminTabs">

          <button
            className={`adminTab ${abaAtiva === "parceiros" ? "active" : ""}`}
            onClick={() => setAbaAtiva("parceiros")}
          >
            Parceiros
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>

        </div>

        {abaAtiva === "parceiros" && (
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
        )}

        {abaAtiva === "solicitacoes" && (
          <div className="adminTable">

            {solicitacoes.map(solicitacao => (

              <div key={solicitacao.id} className="adminTable__row adminTable__row--solicitacao">

                <div className="adminTable__title">
                  {solicitacao.empresa}
                </div>

                <div className="adminTable__category">
                  {solicitacao.categoria}
                </div>

                <div className="adminTable__status">
                  {solicitacao.status}
                </div>

                <div className="adminTable__actions">
                  <Link
                    to={`/parceiros/solicitacoes/${solicitacao.id}`}
                    className="iconBtn"
                  >
                    <FiEye />
                  </Link>
                </div>

              </div>

            ))}

          </div>
        )}
        
      </main>

    </AdminLayout>

  )
}