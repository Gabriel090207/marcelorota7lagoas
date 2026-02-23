import './Noticias.css'
import news1 from '../assets/images/news/news-1.jpg'
import news2 from '../assets/images/news/news-2.jpg'
import news3 from '../assets/images/news/news-3.jpg'

export default function Noticias() {
  return (
    <main className="newsPage">

      {/* HERO COM NOTÍCIA PRINCIPAL */}
<section className="newsPage__hero">

  <div 
    className="newsHeroImage"
    style={{ backgroundImage: `url(${news1})` }}
  >
    <div className="newsHeroOverlay">

      <h1>Novo lançamento big trail chega ao Brasil</h1>
      <p>
        Modelo promete mais autonomia, tecnologia embarcada e conforto
        para viagens longas.
      </p>

      <button className="btn btn--primary">
        Ler matéria completa
      </button>
    </div>
  </div>

</section>




      {/* CATEGORIAS */}
      <section className="newsPage__categories">
        <div className="newsPage__categoriesInner">
          <button className="newsCategoryFilter active">Todas</button>
          <button className="newsCategoryFilter">Mercado</button>
          <button className="newsCategoryFilter">Região</button>
          <button className="newsCategoryFilter">Eventos</button>
          <button className="newsCategoryFilter">Dicas</button>
          <button className="newsCategoryFilter">Moto Clubes</button>
        </div>
      </section>

      {/* LISTAGEM */}
      <section className="newsPage__list">

        <div className="newsPage__sectionHeader">
  <h2>Mais notícias</h2>
  <p>Confira as últimas novidades do portal Rota 7 Lagoas.</p>
</div>
        <div className="newsPage__grid">

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news1})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Mercado</span>


              <div className="newsTags">
  <span className="newsTag">Lançamento</span>
  <span className="newsTag">Big Trail</span>
</div>
              <h3>Novo lançamento big trail chega ao Brasil</h3>
              <p>Modelo promete mais autonomia e tecnologia para viagens longas.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news2})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Região</span>
              <h3>Encontro de moto clubes reúne centenas</h3>
              <p>Evento fortaleceu a cultura motociclística local.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news3})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Dicas</span>
              <h3>Como se preparar para uma viagem segura</h3>
              <p>Checklist essencial para evitar imprevistos na estrada.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news1})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Mercado</span>
              <h3>Novo lançamento big trail chega ao Brasil</h3>
              <p>Modelo promete mais autonomia e tecnologia para viagens longas.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news2})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Região</span>
              <h3>Encontro de moto clubes reúne centenas</h3>
              <p>Evento fortaleceu a cultura motociclística local.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news3})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Dicas</span>
              <h3>Como se preparar para uma viagem segura</h3>
              <p>Checklist essencial para evitar imprevistos na estrada.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>
          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news1})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Mercado</span>
              <h3>Novo lançamento big trail chega ao Brasil</h3>
              <p>Modelo promete mais autonomia e tecnologia para viagens longas.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news2})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Região</span>
              <h3>Encontro de moto clubes reúne centenas</h3>
              <p>Evento fortaleceu a cultura motociclística local.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

          <article className="newsCard">
            <div 
              className="newsImage"
              style={{ backgroundImage: `url(${news3})` }}
            />
            <div className="newsContent">
              <span className="newsCategory">Dicas</span>
              <h3>Como se preparar para uma viagem segura</h3>
              <p>Checklist essencial para evitar imprevistos na estrada.</p>
              <button className="btn btn--outline newsReadMore">
  Ler mais
</button>
            </div>
          </article>

        </div>
      </section>

    </main>
  )
}