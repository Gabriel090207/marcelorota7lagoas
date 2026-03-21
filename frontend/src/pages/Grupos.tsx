import { FiUsers, FiSearch } from "react-icons/fi"
import { useEffect, useState } from "react"
import { getGrupos } from "../services/api"
import "./Grupos.css"

import { Link } from "react-router-dom"

export default function Grupos() {

  const [grupos, setGrupos] = useState<any[]>([])

  useEffect(() => {
    getGrupos().then((data) => {
      if (Array.isArray(data)) {
        setGrupos(data)
      } else {
        setGrupos([])
      }
    })
  }, [])

  return (
    <main className="grupos">

      {/* HEADER */}
      <section className="grupos__header">
        <div className="grupos__headerInner">
          <span className="grupos__label">
            <FiUsers size={14} />
            Comunidade Rota 7
          </span>

          <h1>Moto Clubes & Grupos da Região</h1>

          <p>
            Conheça os grupos que movimentam o motociclismo
            em Sete Lagoas e entorno.
          </p>
        </div>
      </section>

      {/* FILTROS (visual por enquanto) */}
      <section className="grupos__filters">
        <div className="grupos__filtersInner">
          <button className="grupoFilter active">Todos</button>
          <button className="grupoFilter">Custom</button>
          <button className="grupoFilter">Big Trail</button>
          <button className="grupoFilter">Off-road</button>
          <button className="grupoFilter">Estrada</button>
        </div>
      </section>

      {/* BUSCA (visual por enquanto) */}
      <section className="grupos__search">
        <div className="grupos__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar grupo ou moto clube..."
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="grupos__gridSection">
        <div className="grupos__gridInner">

          <div className="gruposGrid">

            {grupos.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhum grupo encontrado
              </p>
            ) : (
              grupos.map((grupo) => (

                <article key={grupo.id} className="grupoCard">

                  {/* IMAGEM */}
                  <div
                    className="grupoCard__image"
                    style={{
                      backgroundImage: `url(${grupo.imagem || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />

                  {/* CONTEÚDO */}
                  <div className="grupoCard__content">

                    <h3>{grupo.nome}</h3>

                    <span>{grupo.tipo}</span>

                    <p>
  {grupo.descricao || "Grupo da comunidade motociclística da região."}
</p>
                    <a
                      href={grupo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      Entrar no Grupo
                    </a>

                  </div>

                </article>

              ))
            )}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="grupos__cta">
        <div className="grupos__ctaInner">

          <span className="cta__label">Moto Clubes</span>

          <h2>Seu grupo ainda não está no Rota 7?</h2>

          <p>
            Cadastre seu moto clube e venha ajudar a fortalecer ainda mais
            a comunidade motociclista da região.
          </p>

          <div className="cta__actions">
           <Link
  to="/grupos/enviar"
  className="btn btn--primary"
>
  Cadastrar grupo
</Link>
          </div>

        </div>
      </section>

    </main>
  )
}