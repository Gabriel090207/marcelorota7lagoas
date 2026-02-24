import { FiUsers, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Grupos.css'

export default function Grupos() {
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

      {/* FILTROS */}
      <section className="grupos__filters">
        <div className="grupos__filtersInner">
          <button className="grupoFilter active">Todos</button>
          <button className="grupoFilter">Custom</button>
          <button className="grupoFilter">Big Trail</button>
          <button className="grupoFilter">Off-road</button>
          <button className="grupoFilter">Estrada</button>
        </div>
      </section>

      {/* BUSCA */}
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

            <article className="grupoCard">
              <div className="grupoCard__image" />
              <div className="grupoCard__content">
                <h3>Os Viajantes</h3>
                <span>Fundado em 2012 • Turismo & Estrada</span>
                <p>
                  Grupo focado em viagens de longa distância
                  e integração entre motociclistas.
                </p>
                <Link to="#" className="btn btn--outline">
          Entrar no Grupo
                </Link>
              </div>
            </article>

            <article className="grupoCard">
              <div className="grupoCard__image" />
              <div className="grupoCard__content">
                <h3>Bravões Moto Clube</h3>
                <span>Big Trail • Aventuras Off-road</span>
                <p>
                  Grupo especializado em trilhas e desafios
                  na região do Espinhaço.
                </p>
                <Link to="#" className="btn btn--outline">
                 Entrar no Grupo
                </Link>
              </div>
            </article>

            <article className="grupoCard">
              <div className="grupoCard__image" />
              <div className="grupoCard__content">
                <h3>Easy Rider SL</h3>
                <span>Custom • Encontros regionais</span>
                <p>
                  Comunidade apaixonada por motos custom
                  e encontros tradicionais.
                </p>
                <Link to="#" className="btn btn--outline">
                  Entrar no Grupo
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="grupos__cta">
        <div className="grupos__ctaInner">

          <span className="cta__label">Moto Clubes</span>

          <h2>Seu grupo ainda não está no Rota 7?</h2>

          <p>
            Cadastre seu moto clube e venhar ajudar a fortalecer ainda mais
            a comunidade motociclista da região.
          </p>

          <div className="cta__actions">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Cadastrar grupo
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}