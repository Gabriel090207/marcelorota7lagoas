import { Link } from 'react-router-dom'
import { FiCalendar, FiFileText, FiTool, FiShoppingBag } from 'react-icons/fi'
import './Home.css'
import news1 from '../assets/images/news/news-1.jpg'
import news2 from '../assets/images/news/news-2.jpg'
import news3 from '../assets/images/news/news-3.jpg'

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="home__hero">
        <div className="home__heroContent">
          <h1>
            O portal oficial do motociclismo
            <span> de Sete Lagoas</span>
          </h1>

          <p>
            Notícias, agenda de eventos, classificados e a cultura biker reunida em um só lugar.
          </p>

          <div className="home__heroButtons">
            <Link to="/eventos" className="btn btn--primary">
              Ver Agenda
            </Link>

            <Link to="/noticias" className="btn btn--outline">
              Últimas Notícias
            </Link>
          </div>
        </div>
      </section>


      {/* ATALHOS RÁPIDOS */}
<section className="home__shortcuts">
  <div className="home__shortcutsInner">
    <div className="home__shortcutsHeader">
      <h2>Acesso rápido</h2>
      <p>Explore o portal: eventos, notícias, dicas e o mercado motociclístico da região.</p>
    </div>

    <div className="home__shortcutsContainer">

      <Link to="/eventos" className="shortcutCard">
        <div className="shortcutIcon">
          <FiCalendar size={20} />
        </div>
        <h3>Agenda & Eventos</h3>
        <p>Encontros, passeios e trilhas da região.</p>
      </Link>

      <Link to="/noticias" className="shortcutCard">
        <div className="shortcutIcon">
          <FiFileText size={20} />
        </div>
        <h3>Notícias</h3>
        <p>Lançamentos, mercado e novidades locais.</p>
      </Link>

      <Link to="/dicas" className="shortcutCard">
        <div className="shortcutIcon">
          <FiTool size={20} />
        </div>
        <h3>Dicas</h3>
        <p>Pilotagem, manutenção e segurança.</p>
      </Link>

      <Link to="/classificados" className="shortcutCard">
        <div className="shortcutIcon">
          <FiShoppingBag size={20} />
        </div>
        <h3>Classificados & Mercado</h3>
        <p>Motos, oficinas, lojas e serviços.</p>
      </Link>

    </div>
  </div>
</section>


{/* PRÓXIMOS EVENTOS */}
<section className="home__events">
  <div className="home__eventsInner">
    <div className="home__eventsHeader">
      <div>
        <h2>Próximos eventos</h2>
        <p>Encontros, passeios e rolês confirmados na região.</p>
      </div>

      <Link to="/eventos" className="btn btn--outline">
        Ver agenda completa
      </Link>
    </div>

    <div className="home__eventsGrid">
      <article className="eventCard">
        <div className="eventDate">
          <span className="eventDay">12</span>
          <span className="eventMonth">OUT</span>
        </div>

        <div className="eventInfo">
          <h3>Encontro Rota 7 Lagoas</h3>
          <p>Sete Lagoas • Praça central</p>
          <div className="eventTags">
            <span className="tag">Encontro</span>
            <span className="tag">Cidade</span>
          </div>
        </div>
      </article>

      <article className="eventCard">
        <div className="eventDate">
          <span className="eventDay">19</span>
          <span className="eventMonth">OUT</span>
        </div>

        <div className="eventInfo">
          <h3>Passeio Bate e Volta Serra</h3>
          <p>Saída: Posto X • 07:00</p>
          <div className="eventTags">
            <span className="tag">Passeio</span>
            <span className="tag">Estrada</span>
          </div>
        </div>
      </article>

      <article className="eventCard">
        <div className="eventDate">
          <span className="eventDay">02</span>
          <span className="eventMonth">NOV</span>
        </div>

        <div className="eventInfo">
          <h3>Trilha Região do Espinhaço</h3>
          <p>Concentração: 06:30 • Terra/Trilha</p>
          <div className="eventTags">
            <span className="tag">Trilha</span>
            <span className="tag">Off-road</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>


{/* ÚLTIMAS NOTÍCIAS */}
<section className="home__news">
  <div className="home__newsInner">

    <div className="home__newsHeader">
      <div>
        <h2>Últimas notícias</h2>
        <p>Fique por dentro do que acontece no mundo das motos e na região.</p>
      </div>

      <Link to="/noticias" className="btn btn--outline">
        Ver todas
      </Link>
    </div>

    <div className="home__newsGrid">

      <article className="newsCard">
        <div 
  className="newsImage"
  style={{ backgroundImage: `url(${news1})` }}
/>
        <div className="newsContent">
          <span className="newsCategory">Mercado</span>
          <h3>Novo lançamento big trail chega ao Brasil</h3>
          <p>Modelo promete mais autonomia e tecnologia para viagens longas.</p>
        </div>
      </article>

      <article className="newsCard">
        <div 
  className="newsImage"
  style={{ backgroundImage: `url(${news2})` }}
/>
        <div className="newsContent">
          <span className="newsCategory">Região</span>
          <h3>Encontro de moto clubes reúne centenas em Sete Lagoas</h3>
          <p>Evento fortaleceu a cultura motociclística local.</p>
        </div>
      </article>

      <article className="newsCard">
        <div 
  className="newsImage"
  style={{ backgroundImage: `url(${news3})` }}
/>
        <div className="newsContent">
          <span className="newsCategory">Dicas</span>
          <h3>Como se preparar para uma viagem de moto segura</h3>
          <p>Checklist essencial para evitar imprevistos na estrada.</p>
        </div>
      </article>

    </div>

  </div>
</section>


{/* MERCADO & PARCEIROS */}
<section className="home__market">
  <div className="home__marketInner">

    <div className="home__marketLeft">
      <span className="marketLabel">Mercado Regional</span>
      <h2>Empresas que movem a Rota 7</h2>
      <p>
        Oficinas, lojas e serviços que fortalecem o motociclismo em
        Sete Lagoas e região.
      </p>

      <div className="marketActions">
        <Link to="/classificados" className="btn btn--primary">
          Ver classificados
        </Link>

        <a
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline"
        >
          Quero anunciar
        </a>
      </div>
    </div>

    <div className="home__marketRight">

      <div className="marketItem">
        <div>
          <h4>Oficina Moto Forte</h4>
          <span>Manutenção especializada</span>
        </div>
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>

      <div className="marketItem">
        <div>
          <h4>Biker Store SL</h4>
          <span>Equipamentos e acessórios</span>
        </div>
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>

      <div className="marketItem">
        <div>
          <h4>Pneus Speed Moto</h4>
          <span>Pneus e alinhamento</span>
        </div>
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>

      <div className="marketItem">
        <div>
          <h4>Hotel Biker Point</h4>
          <span>Hospedagem biker friendly</span>
        </div>
        <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>

    </div>

  </div>
</section>



{/* NEWSLETTER */}
<section className="home__newsletter">
  <div className="home__newsletterInner">

    <div className="newsletterContent">
      <span className="newsletterLabel">Comunidade Rota 7</span>

      <h2>Receba a agenda e novidades da semana</h2>

      <p>
        Eventos, lançamentos e conteúdos exclusivos direto no seu e-mail.
      </p>

      <form className="newsletterForm">
        <input 
          type="email" 
          placeholder="Seu melhor e-mail"
          required
        />
        <button type="submit">
          Quero receber
        </button>
      </form>

    </div>

  </div>
</section>

    </main>
  )
}