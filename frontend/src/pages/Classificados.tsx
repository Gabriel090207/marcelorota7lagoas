import './Classificados.css'

import heroMercado from '../assets/images/hero-mercado.png'


import { FiSearch, FiStar } from 'react-icons/fi'
import { SectionDivider } from '../components/SectionDivider/SectionDivider'

import { useEffect, useState } from 'react'
import { getParceiros } from '../services/api'
import { getAnuncios } from '../services/api'

import { Link } from "react-router-dom"

export default function Classificados() {

  const [parceiros, setParceiros] = useState<any[]>([])
  const [anuncios, setAnuncios] = useState<any[]>([])


  
  useEffect(() => {
  getParceiros().then(setParceiros)
  getAnuncios().then(setAnuncios)
}, [])

const filtrarPorCategoria = (categorias: string[]) => {
  return parceiros.filter((p: any) =>
    categorias.some(cat =>
      p.categoria?.toLowerCase().includes(cat)
    )
  )
}

const servicos = filtrarPorCategoria(["serviço", "oficina"])
const hospedagens = filtrarPorCategoria(["hotel", "pousada"])




const motos = anuncios.filter(
  (item: any) =>
    item.categoria?.toLowerCase().trim() === "moto"
)

const equipamentos = anuncios.filter(
  (item: any) =>
    item.categoria?.toLowerCase().trim() === "equipamento"
)

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
            <Link
  to="/quero-anunciar"
  className="btn btn--primary heroButton"
>
  Quero anunciar
</Link>
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

            {parceiros.slice(0,3).map((p, index) => (

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
          
            </div>

           <Link
  to="/classificados/produtos?categoria=moto"
  className="btn btn--outline"
>
  Ver todos
</Link>
          </div>

          <div className="motorcyclesGrid">

  {motos.slice(0, 3).map((item: any) => (

    <div key={item.id} className="motorcycleCard">

      <div
        className="motorcycleCard__image"
        style={{
          backgroundImage: `url(${item.imagem || ""})`
        }}
      />

      <div className="motorcycleCard__content">

        <h3>{item.titulo}</h3>

        <span className="motorcyclePrice">
          {item.preco}
        </span>

        {item.km && (
          <span className="motorcycleInfo">
            {item.km} km rodados
          </span>
        )}

        {item.descricao && (
          <span className="motorcycleInfo">
            {item.descricao.slice(0, 80)}
          </span>
        )}

        <a
          href={`https://wa.me/55${item.telefone?.replace(/\D/g, "")}`}
          target="_blank"
          className="btn btn--primary"
        >
          Falar no WhatsApp
        </a>

      </div>

    </div>

  ))}

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
             
            </div>

           <Link
  to="/classificados/produtos?categoria=equipamento"
  className="btn btn--outline"
>
  Ver todos
</Link>
          </div>

          <div className="gearGrid">

  {equipamentos.slice(0, 3).map((item: any) => (

    <div key={item.id} className="gearCard">

      <div
        className="gearCard__image"
        style={{
          backgroundImage: `url(${item.imagem || ""})`
        }}
      />

      <div className="gearCard__content">

        <h3>{item.titulo}</h3>

        <span className="gearPrice">
          {item.preco}
        </span>

        {item.descricao && (
          <span>
            {item.descricao.slice(0, 80)}
          </span>
        )}

        <a
          href={`https://wa.me/55${item.telefone?.replace(/\D/g, "")}`}
          target="_blank"
          className="btn btn--primary"
        >
          Falar no WhatsApp
        </a>

      </div>

    </div>

  ))}

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
             
            </div>

           <Link
  to="/classificados/parceiros?categoria=servico"
  className="btn btn--outline"
>
  Ver todos
</Link>
          </div>

          <div className="servicesGrid">

  {servicos.slice(0, 3).map((item: any) => (

    <div key={item.id} className="gearCard">

      <div
        className="gearCard__image"
        style={{
          backgroundImage: `url(${item.imagem || ""})`
        }}
      />

      <div className="gearCard__content">

        <h3>{item.nome}</h3>

<span>
  {item.descricao?.slice(0, 100)}
</span>

        {item.descricao && (
          <span>
            {item.descricao.slice(0, 80)}
          </span>
        )}

        <a
          href={`https://wa.me/55${item.telefone?.replace(/\D/g, "")}`}
          target="_blank"
          className="btn btn--primary"
        >
          Falar no WhatsApp
        </a>

      </div>

    </div>

  ))}

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
              
            </div>

            <Link
  to="/classificados/parceiros?categoria=hospedagem"
  className="btn btn--outline"
>
  Ver todos
</Link>
          </div>

         <div className="lodgingGrid">

  {hospedagens.slice(0, 3).map((item: any) => (

    <div key={item.id} className="lodgingCard">

      <div
        className="lodgingCard__image"
        style={{
          backgroundImage: `url(${item.imagem || ""})`
        }}
      />

      <div className="lodgingCard__content">

        <h3>{item.nome}</h3>

        <span>
          {item.descricao?.slice(0, 100)}
        </span>

        <a
          href={`https://wa.me/55${item.telefone?.replace(/\D/g, "")}`}
          target="_blank"
          className="btn btn--primary"
        >
          Reservar / Contatar
        </a>

      </div>

    </div>

  ))}

</div>
        </div>
      </section>

    </main>
  )
}