import './Classificados.css'

import heroMercado from '../assets/images/hero-mercado.png'
import moto from '../assets/images/moto.png'
import hotel from '../assets/images/hotel.png'
import capacete from '../assets/images/capacete.png'
import oficinaImg from '../assets/images/oficina.png'

import { FiSearch, FiStar } from 'react-icons/fi'
import { SectionDivider } from '../components/SectionDivider/SectionDivider'

import { useEffect, useState } from 'react'
import { getParceiros } from '../services/api'

export default function Classificados() {

  const [parceiros, setParceiros] = useState<any[]>([])

  useEffect(() => {
    getParceiros().then(setParceiros)
  }, [])

  return (
    <main className="classifieds">

      {/* HERO */}
      <section 
        className="classifieds__hero"
        style={{ backgroundImage: `url(${heroMercado})` }}
      >
        <div className="classifieds__heroOverlay" />

        <div className="classifieds__heroContent">
          <h1>
            Classificados <br />
            <span>& Mercado</span>
          </h1>

          <p>
            Encontre motos, oficinas, equipamentos e serviços
            que movem o motociclismo em Sete Lagoas e região.
          </p>

          <div className="classifieds__heroActions">
            <a
              href="/quero-anunciar"
              target="_blank"
              className="btn btn--primary heroButton"
            >
              Quero anunciar
            </a>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="classifieds__filters">
        <div className="classifieds__filtersInner">
          <button className="filterButton active">Todos</button>
          <button className="filterButton">Motos</button>
          <button className="filterButton">Oficinas</button>
          <button className="filterButton">Equipamentos</button>
          <button className="filterButton">Hospedagem</button>
          <button className="filterButton">Serviços</button>
        </div>
      </section>

      {/* SEARCH */}
      <section className="classifieds__search">
        <div className="classifieds__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input placeholder="Buscar..." />
          </div>
        </div>
      </section>

      {/* 🔥 PARCEIROS DINÂMICO */}
      <section className="classifieds__featured">
        <div className="classifieds__featuredInner">

          <div className="classifieds__sectionHeader">
            <div>
              <h2>Empresas em Destaque</h2>
              <p>Parceiros do portal</p>
            </div>

            <button
              className="btn btn--outline"
              onClick={() => window.location.href = "/classificados/parceiros"}
            >
              Ver todos
            </button>
          </div>

          <div className="classifieds__featuredGrid">

            {parceiros.slice(0, 6).map((p, index) => (

              <div
                key={p.id}
                className={`featuredCard ${index === 0 ? "featuredCard--premium" : ""}`}
              >

                {index === 0 && (
                  <span className="featuredBadge">
                    <FiStar size={14} />
                    Destaque
                  </span>
                )}

                <div
                  className="featuredCard__image"
                  style={{
                    backgroundImage: `url(${p.imagem || ""})`
                  }}
                />

                <div className="featuredCard__content">

                  <h3>{p.nome}</h3>

                  <span>
                    {p.descricao?.slice(0, 120)}
                  </span>

                  <a
                    href={`mailto:${p.email}`}
                    className="btn btn--primary"
                  >
                    Entrar em contato
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      <SectionDivider />

      {/* RESTO AINDA MOCK (depois conectamos) */}

      {/* MOTOS */}
      <section className="classifieds__motorcycles">
        <div className="classifieds__motorcyclesInner">

          <div className="classifieds__sectionHeader">
            <div>
              <h2>Compra e Venda de Motos</h2>
              <p>Em breve integrado</p>
            </div>

            <button className="btn btn--outline">
              Ver todos
            </button>
          </div>

          <div className="motorcyclesGrid">
            <div className="motorcycleCard">
              <div className="motorcycleCard__image" style={{ backgroundImage: `url(${moto})` }} />
              <div className="motorcycleCard__content">
                <h3>Em breve</h3>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* EQUIPAMENTOS */}
      <section className="classifieds__gear">
        <div className="classifieds__gearInner">

          <div className="classifieds__sectionHeader">
            <div>
              <h2>Equipamentos</h2>
              <p>Em breve</p>
            </div>

            <button className="btn btn--outline">
              Ver todos
            </button>
          </div>

          <div className="gearGrid">
            <div className="gearCard">
              <div className="gearCard__image" style={{ backgroundImage: `url(${capacete})` }} />
              <div className="gearCard__content">
                <h3>Em breve</h3>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* SERVIÇOS */}
      <section className="classifieds__services">
        <div className="classifieds__servicesInner">

          <div className="classifieds__sectionHeader">
            <div>
              <h2>Serviços</h2>
              <p>Em breve</p>
            </div>

            <button className="btn btn--outline">
              Ver todos
            </button>
          </div>

          <div className="servicesGrid">
            <div className="serviceCard">
              <div className="serviceCard__image" style={{ backgroundImage: `url(${oficinaImg})` }} />
              <div className="serviceCard__content">
                <h3>Em breve</h3>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* HOSPEDAGEM */}
      <section className="classifieds__lodging">
        <div className="classifieds__lodgingInner">

          <div className="classifieds__sectionHeader">
            <div>
              <h2>Hospedagem</h2>
              <p>Em breve</p>
            </div>

            <button className="btn btn--outline">
              Ver todos
            </button>
          </div>

          <div className="lodgingGrid">
            <div className="lodgingCard">
              <div className="lodgingCard__image" style={{ backgroundImage: `url(${hotel})` }} />
              <div className="lodgingCard__content">
                <h3>Em breve</h3>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}