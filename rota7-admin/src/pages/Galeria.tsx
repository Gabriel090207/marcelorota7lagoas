import AdminLayout from "../components/admin/AdminLayout"
import "./Galeria.css"
import { Link } from "react-router-dom"

import { FiPlus, FiTrash, FiX } from "react-icons/fi"

import { useEffect, useState } from "react"
import { getImagens, deleteImagem } from "../services/api"

export default function Galeria() {

  const [imagens, setImagens] = useState<any[]>([])
  const [selectedImg, setSelectedImg] = useState<any | null>(null)

  useEffect(() => {
    getImagens().then(setImagens)
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteImagem(id)

      // remove da tela sem reload
      setImagens(prev => prev.filter(img => img.id !== id))

    } catch (error) {
      console.error(error)
    }
  }

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

          {imagens.length === 0 ? (
            <p style={{ opacity: 0.6 }}>
              Nenhuma imagem cadastrada
            </p>
          ) : (

            imagens.map(img => (

              <div
                key={img.id}
                className="galleryCard"
                onClick={() => setSelectedImg(img)}
              >

                {/* IMAGEM */}
                <img src={img.url} alt="" />

                {/* OVERLAY */}
                <div className="galleryOverlay">

                  {/* CATEGORIA */}
                  <span className="galleryCategory">
                    {img.categoria}
                  </span>

                  {/* DELETE */}
                  <button
                    className="iconBtn danger"
                    onClick={(e) => {
                      e.stopPropagation() // 🔥 evita abrir modal
                      handleDelete(img.id)
                    }}
                  >
                    <FiTrash />
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* MODAL */}
        {selectedImg && (
          <div className="galeriaModal">

            {/* OVERLAY */}
            <div
              className="galeriaOverlay"
              onClick={() => setSelectedImg(null)}
            />

            {/* BOTÃO FECHAR */}
            <button
              className="galeriaClose"
              onClick={() => setSelectedImg(null)}
            >
              <FiX size={22} />
            </button>

            {/* IMAGEM */}
            <div className="galeriaModalContent">
              <img src={selectedImg.url} alt="" />
            </div>

          </div>
        )}

      </main>

    </AdminLayout>
  )
}



