import AdminLayout from "../components/admin/AdminLayout"
import "./Dashboard.css"


import { useEffect, useState } from "react"

import {
  FiFileText,
  FiTool,
  FiUsers,
  FiImage,
} from "react-icons/fi"

export default function Dashboard() {

  const [showToast, setShowToast] = useState(false)

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

 return (
  <>
    <AdminLayout>

      <main className="dashboard">

        <div className="dashboard__header">
          <h1>Painel Administrativo</h1>
          <p>Resumo do portal Rota 7 Lagoas</p>
        </div>

        {/* CARDS DE MÉTRICAS */}

        <div className="dashboard__stats">

          <div className="statCard">
            <FiFileText className="statIcon"/>
            <div>
              <h3>Notícias</h3>
              <span>24 publicadas</span>
            </div>
          </div>

          <div className="statCard">
            <FiTool className="statIcon"/>
            <div>
              <h3>Dicas</h3>
              <span>12 artigos</span>
            </div>
          </div>

          <div className="statCard">
            <FiUsers className="statIcon"/>
            <div>
              <h3>Parceiros</h3>
              <span>8 cadastrados</span>
            </div>
          </div>

          <div className="statCard">
            <FiImage className="statIcon"/>
            <div>
              <h3>Galeria</h3>
              <span>156 fotos</span>
            </div>
          </div>

        </div>


        {/* EVENTOS */}

        <div className="dashboard__events">

          <div className="dashboard__sectionHeader">
            <h2>Próximos eventos</h2>
          </div>

          <div className="eventsList">

            <div className="eventItem">
              <div className="eventDate">
                <span className="eventDay">12</span>
                <span className="eventMonth">OUT</span>
              </div>

              <div className="eventInfo">
                <h3>Encontro Rota 7 Lagoas</h3>
                <p>Praça Central • Sete Lagoas</p>
              </div>
            </div>

            <div className="eventItem">
              <div className="eventDate">
                <span className="eventDay">19</span>
                <span className="eventMonth">OUT</span>
              </div>

              <div className="eventInfo">
                <h3>Passeio Serra do Espinhaço</h3>
                <p>Saída 07:00 • Posto X</p>
              </div>
            </div>

            <div className="eventItem">
              <div className="eventDate">
                <span className="eventDay">02</span>
                <span className="eventMonth">NOV</span>
              </div>

              <div className="eventInfo">
                <h3>Trilha Off-road Regional</h3>
                <p>Região do Espinhaço</p>
              </div>
            </div>

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