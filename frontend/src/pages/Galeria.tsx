import './Galeria.css'
import { useEffect, useState } from "react"
import { getImagens } from "../services/api"

import { FiX } from "react-icons/fi"

export default function Galeria() {

  const [imagens, setImagens] = useState<any[]>([])
  const [filtro, setFiltro] = useState("Todos")
  const [selectedImg, setSelectedImg] = useState<any | null>(null)

  useEffect(() => {
    getImagens().then(setImagens)
  }, [])

 const imagensOrdenadas = [...imagens].sort((a, b) => {
  return Number(b.created_at || 0) - Number(a.created_at || 0)
})

const imagensFiltradas =
  filtro === "Todos"
    ? imagensOrdenadas
    : imagensOrdenadas.filter(img => img.categoria === filtro)

  return (
    <main className="galeria">

      {/* HEADER */}
      <section className="galeria__header">
        <div className="galeria__headerInner">
          <span className="galeria__label">GALERIA</span>

          <h1>
            Registros do motociclismo em Sete Lagoas e região.
          </h1>

          <p>
            Momentos capturados em passeios, encontros,
            trilhas e eventos da comunidade.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="galeria__filters">
        <div className="galeria__filtersInner">

          {["Todos", "Passeios", "Trilhas", "Eventos", "Grupos"].map(cat => (
            <button
              key={cat}
              className={`galeriaFilter ${filtro === cat ? "active" : ""}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}

        </div>
      </section>

      {/* GRID */}
      <section className="galeria__gridSection">
        <div className="galeria__gridInner">

          <div className="galeriaGrid">

            {imagensFiltradas.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhuma imagem encontrada
              </p>
            ) : (

              imagensFiltradas.map(img => (

                <div
                  key={img.id}
                  className="galeriaItem"
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img.url} alt="" />
                </div>

              ))

            )}

          </div>

        </div>
      </section>

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
  )
}