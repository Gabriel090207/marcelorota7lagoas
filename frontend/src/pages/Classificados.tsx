import './Classificados.css'

import oficinaImg from '../assets/images/oficina.png'
import bikerStoreImg from '../assets/images/biker-store.jpg'
import heroMercado from '../assets/images/hero-mercado.png'

import moto from '../assets/images/moto.png'
import hotel from '../assets/images/hotel.png'
import capacete from '../assets/images/capacete.png'


import { FiSearch } from 'react-icons/fi'
import { FiStar } from 'react-icons/fi'

import { SectionDivider } from '../components/SectionDivider/SectionDivider'

export default function Classificados() {
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
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
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

            {/* BARRA DE PESQUISA */}
      <section className="classifieds__search">
        <div className="classifieds__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar motos, oficinas, equipamentos..."
            />
          </div>
        </div>
      </section>

            {/* EMPRESAS EM DESTAQUE */}
      <section className="classifieds__featured">
        <div className="classifieds__featuredInner">

          <div className="classifieds__sectionHeader">
            <h2>Empresas em Destaque</h2>
            <p>Parceiros premium que fortalecem o motociclismo da região.</p>
          </div>

          <div className="classifieds__featuredGrid">

            {/* CARD PREMIUM */}
            <div className="featuredCard featuredCard--premium">

              <span className="featuredBadge">
                <FiStar size={14} />
                Destaque Premium
              </span>

              <div 
                className="featuredCard__image"
                style={{ backgroundImage: `url(${bikerStoreImg})` }}
              />

              <div className="featuredCard__content">
                <h3>Oficina Moto Forte</h3>

                <span>
                  Especializada em motos de alta cilindrada,
                  revisão completa e preparação para viagens.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* CARD PADRÃO */}
            <div className="featuredCard">

              <div 
                className="featuredCard__image"
                style={{ backgroundImage: `url(${bikerStoreImg})` }}
              />

              <div className="featuredCard__content">
                <h3>Biker Store SL</h3>

                <span>
                  Equipamentos, acessórios e peças premium
                  para motociclistas exigentes.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>


             <div className="featuredCard">

              <div 
                className="featuredCard__image"
                style={{ backgroundImage: `url(${bikerStoreImg})` }}
              />

              <div className="featuredCard__content">
                <h3>Biker Store SL</h3>

                <span>
                  Equipamentos, acessórios e peças premium
                  para motociclistas exigentes.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <SectionDivider />


            {/* COMPRA E VENDA DE MOTOS */}
      <section className="classifieds__motorcycles">
        <div className="classifieds__motorcyclesInner">

          <div className="classifieds__sectionHeader">
            <h2>Compra e Venda de Motos</h2>
            <p>Encontre oportunidades na região de Sete Lagoas.</p>
          </div>

          <div className="motorcyclesGrid">

            {/* CARD 1 */}
            <div className="motorcycleCard">
              <div 
                className="motorcycleCard__image"
                style={{ backgroundImage: `url(${moto})` }}
              />

              <div className="motorcycleCard__content">
                <h3>Honda CB 500X</h3>
                <span className="motorcycleInfo">2022 • 18.000 km</span>
                <strong className="motorcyclePrice">R$ 38.900</strong>
                <span className="motorcycleLocation">Sete Lagoas - MG</span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="motorcycleCard">
              <div 
                className="motorcycleCard__image"
                style={{ backgroundImage: `url(${moto})` }}
              />

              <div className="motorcycleCard__content">
                <h3>Yamaha MT-07</h3>
                <span className="motorcycleInfo">2021 • 12.500 km</span>
                <strong className="motorcyclePrice">R$ 42.500</strong>
                <span className="motorcycleLocation">Prudente de Morais - MG</span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>


             <div className="motorcycleCard">
              <div 
                className="motorcycleCard__image"
                style={{ backgroundImage: `url(${moto})` }}
              />

              <div className="motorcycleCard__content">
                <h3>Honda CB 500X</h3>
                <span className="motorcycleInfo">2022 • 18.000 km</span>
                <strong className="motorcyclePrice">R$ 38.900</strong>
                <span className="motorcycleLocation">Sete Lagoas - MG</span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      <SectionDivider />


      {/* EQUIPAMENTOS E ACESSÓRIOS */}
      <section className="classifieds__gear">
        <div className="classifieds__gearInner">

          <div className="classifieds__sectionHeader">
            <h2>Equipamentos & Acessórios</h2>
            <p>Produtos disponíveis na região para sua segurança e estilo.</p>
          </div>

          <div className="gearGrid">

            <div className="gearCard">
              <div 
                className="gearCard__image"
                style={{ backgroundImage: `url(${capacete})` }}
              />

              <div className="gearCard__content">
                <h3>Capacete LS2 Storm</h3>
                <strong className="gearPrice">R$ 899</strong>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="gearCard">
              <div 
                className="gearCard__image"
                style={{ backgroundImage: `url(${capacete})` }}
              />

              <div className="gearCard__content">
                <h3>Jaqueta Texx Strike</h3>
                <strong className="gearPrice">R$ 1.250</strong>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="gearCard">
              <div 
                className="gearCard__image"
                style={{ backgroundImage: `url(${capacete})` }}
              />

              <div className="gearCard__content">
                <h3>Jaqueta Texx Strike</h3>
                <strong className="gearPrice">R$ 1.250</strong>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      <SectionDivider />


            {/* SERVIÇOS MECÂNICOS */}
      <section className="classifieds__services">
        <div className="classifieds__servicesInner">

          <div className="classifieds__sectionHeader">
            <h2>Serviços Mecânicos</h2>
            <p>Oficinas e especialistas prontos para cuidar da sua moto.</p>
          </div>

          <div className="servicesGrid">

            <div className="serviceCard">
              <div 
                className="serviceCard__image"
                style={{ backgroundImage: `url(${oficinaImg})` }}
              />

              <div className="serviceCard__content">
                <h3>Oficina Moto Forte</h3>
                <span>
                  Revisão completa, elétrica, suspensão e preparação para viagens.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="serviceCard">
              <div 
                className="serviceCard__image"
                style={{ backgroundImage: `url(${oficinaImg})` }}
              />

              <div className="serviceCard__content">
                <h3>Speed Motos Performance</h3>
                <span>
                  Especializada em motos esportivas e preparação de motores.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="serviceCard">
              <div 
                className="serviceCard__image"
                style={{ backgroundImage: `url(${oficinaImg})` }}
              />

              <div className="serviceCard__content">
                <h3>Oficina Moto Forte</h3>
                <span>
                  Revisão completa, elétrica, suspensão e preparação para viagens.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <SectionDivider />

            {/* HOSPEDAGENS BIKER FRIENDLY */}
      <section className="classifieds__lodging">
        <div className="classifieds__lodgingInner">

          <div className="classifieds__sectionHeader">
            <h2>Hospedagens Biker Friendly</h2>
            <p>
              Locais preparados para receber motociclistas e grupos da região.
            </p>
          </div>

          <div className="lodgingGrid">

            <div className="lodgingCard">
              <div 
                className="lodgingCard__image"
                style={{ backgroundImage: `url(${hotel})` }}
              />

              <div className="lodgingCard__content">
                <h3>Pousada Serra Azul</h3>
                <span>
                  Estacionamento coberto, área para grupos e café da manhã completo.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Reservar via WhatsApp
                </a>
              </div>
            </div>

            <div className="lodgingCard">
              <div 
                className="lodgingCard__image"
                style={{ backgroundImage: `url(${hotel})` }}
              />

              <div className="lodgingCard__content">
                <h3>Hotel Central SL</h3>
                <span>
                  Localização estratégica no centro, ideal para encontros e eventos.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Reservar via WhatsApp
                </a>
              </div>
            </div>


            <div className="lodgingCard">
              <div 
                className="lodgingCard__image"
                style={{ backgroundImage: `url(${hotel})` }}
              />

              <div className="lodgingCard__content">
                <h3>Hotel Central SL</h3>
                <span>
                  Localização estratégica no centro, ideal para encontros e eventos.
                </span>

                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Reservar via WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA COMERCIAL FINAL */}
      <section className="classifieds__cta">
        <div className="classifieds__ctaInner">

          <span className="cta__label">
            ANUNCIE NO ROTA 7
          </span>

          <div className="cta__content">
            <h2>Seu negócio pode estar aqui.</h2>

            <p>
              Divulgue sua loja, oficina, pousada ou serviço
              para toda a comunidade motociclista de Sete Lagoas
              e região.
            </p>
          </div>

          <div className="cta__actions">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Falar no WhatsApp
            </a>

           
          </div>

        </div>
      </section>
    </main>
  )
}