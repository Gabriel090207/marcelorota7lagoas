import './Dicas.css'

import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { getDicas } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Dicas() {

  const [dicas, setDicas] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  const navigate = useNavigate()

  useEffect(() => {
    getDicas()
      .then(setDicas)
      .catch(console.error)
  }, [])

  if (!dicas.length) {
    return <div style={{ padding: 40 }}>Carregando dicas...</div>
  }

  const dicasFiltradas = dicas.filter((d) => {

  const texto = busca.toLowerCase()

  const matchBusca =
    d.titulo?.toLowerCase().includes(texto) ||
    d.conteudo?.toLowerCase().includes(texto)

  const matchCategoria =
    categoria === "Todas" ||
    d.categoria === categoria

  return matchBusca && matchCategoria
})

  // 🔥 DESTAQUE + GRID
  const destaque = categoria === "Todas" ? dicasFiltradas[0] : null
  const outrasDicas =
    categoria === "Todas"
      ? dicasFiltradas.slice(1)
      : dicasFiltradas

  return (
    <main className="dicas">

      {/* HEADER */}
      <section className="dicas__header">
        <div className="dicas__headerInner">
          <span className="dicas__label">
            DICAS & PILOTAGEM
          </span>

          <h1>
            Aprimore sua pilotagem e cuide melhor da sua moto.
          </h1>

          <p>
            Conteúdos sobre segurança, técnicas de condução,
            manutenção e experiências da comunidade motociclista.
          </p>
        </div>
      </section>

      {/* DESTAQUE */}
      {destaque && (
        <section className="dicas__featured">
          <div className="dicas__featuredInner">

            <div
              className="featuredDica__image"
              style={{
                backgroundImage: `url(${destaque.imagem})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            <div className="featuredDica__content">
              <span className="dicaCategoryTag">
                {destaque.categoria}
              </span>

              <h2>{destaque.titulo}</h2>

              <p>
                {destaque.conteudo
                  ?.replace(/<[^>]+>/g, "")
                  .slice(0, 140)}...
              </p>

              <button
                className="btn btn--primary"
                onClick={() => navigate(`/dicas/${destaque.id}`)}
              >
                Ler artigo completo
              </button>
            </div>

          </div>
        </section>
      )}

      {/* CATEGORIAS */}
      <section className="dicas__categories">
        <div className="dicas__categoriesInner">

          {["Todas", "Pilotagem", "Segurança", "Manutenção"].map((cat) => (
            <button
              key={cat}
              className={`dicasCategoryFilter ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}

        </div>
      </section>

      {/* BUSCA */}
      <section className="dicas__search">
        <div className="dicas__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar dicas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="dicas__gridSection">
        <div className="dicas__gridInner">

          <div className="dicasGrid">

            {outrasDicas.map((dica) => (
              <article key={dica.id} className="dicaCard">

                <div
                  className="dicaCard__image"
                  style={{
                    backgroundImage: `url(${dica.imagem})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />

                <div className="dicaCard__content">

                  <span className="dicaCategoryTag">
                    {dica.categoria}
                  </span>

                  <h3>{dica.titulo}</h3>

                  <p>
                    {dica.conteudo
                      ?.replace(/<[^>]+>/g, "")
                      .slice(0, 100)}...
                  </p>

                  <button
                    className="dicaReadMore"
                    onClick={() => navigate(`/dicas/${dica.id}`)}
                  >
                    Ler mais
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

    </main>
  )
}