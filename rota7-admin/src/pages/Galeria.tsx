import AdminLayout from "../components/admin/AdminLayout"
import "./Galeria.css"
import { Link } from "react-router-dom"

import { FiPlus, FiTrash } from "react-icons/fi"

export default function Galeria() {

  const imagens = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518655048521-f130df041f66"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1549921296-3a6b9b0b6c90"
    }
  ]

  return (

    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Galeria</h1>
            <p>Gerencie as fotos do portal</p>
          </div>

          
<Link to="/galeria/nova" className="btn btn--primary">
  <FiPlus />
  Adicionar imagem
</Link>

        </div>

        <div className="galleryGrid">

          {imagens.map(img => (

            <div key={img.id} className="galleryCard">

              <img src={img.url} alt="" />

              <div className="galleryOverlay">

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