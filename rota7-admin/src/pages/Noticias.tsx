import AdminLayout from "../components/admin/AdminLayout"
import { Link } from "react-router-dom"
import "./Noticias.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"

export default function Noticias() {

  const noticias = [
    {
      id: 1,
      titulo: "Novo lançamento big trail chega ao Brasil",
      categoria: "Mercado"
    },
    {
      id: 2,
      titulo: "Encontro de moto clubes reúne centenas",
      categoria: "Região"
    },
    {
      id: 3,
      titulo: "Checklist para viagens longas",
      categoria: "Dicas"
    }
  ]

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Notícias</h1>
            <p>Gerencie as notícias do portal</p>
          </div>

          <Link to="/noticias/nova" className="btn btn--primary">
  <FiPlus />
  Nova notícia
</Link>

        </div>


        <div className="adminTable">

          {noticias.map(noticia => (

            <div key={noticia.id} className="adminTable__row">

              <div className="adminTable__title">
                {noticia.titulo}
              </div>

              <div className="adminTable__category">
                {noticia.categoria}
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