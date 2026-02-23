import './Dicas.css'

export default function Dicas() {
  return (
    <main className="dicas">

      {/* HEADER EDITORIAL */}
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
            manutenção e experiências da comunidade motociclista
            de Sete Lagoas e região.
          </p>
        </div>
      </section>

      


            {/* ARTIGO DESTAQUE */}
      <section className="dicas__featured">
        <div className="dicas__featuredInner">

          <div className="featuredDica__image" />

          <div className="featuredDica__content">
            <span className="dicaCategoryTag">
              Segurança
            </span>

            <h2>
              Como pilotar com segurança em rodovias movimentadas
            </h2>

            <p>
              Técnicas avançadas de posicionamento, leitura de tráfego
              e antecipação de riscos para viagens mais seguras.
            </p>

            <button className="btn btn--primary">
              Ler artigo completo
            </button>
          </div>

        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="dicas__categories">
        <div className="dicas__categoriesInner">
          <button className="dicasCategory active">Todos</button>
          <button className="dicasCategory">Asfalto</button>
          <button className="dicasCategory">Off-road</button>
          <button className="dicasCategory">Manutenção</button>
          <button className="dicasCategory">Grupo</button>
          <button className="dicasCategory">Segurança</button>
        </div>
      </section>

      {/* GRID DE ARTIGOS */}
      <section className="dicas__gridSection">
        <div className="dicas__gridInner">

          <div className="dicasGrid">

            <article className="dicaCard">
              <div className="dicaCard__image" />

              <div className="dicaCard__content">
                <span className="dicaCategoryTag">Segurança</span>
                <h3>5 Técnicas para pilotar com mais segurança na cidade</h3>
                <p>
                  Dicas práticas para evitar riscos no trânsito urbano
                  e melhorar sua condução no dia a dia.
                </p>
                <button className="dicaReadMore">Ler mais</button>
              </div>
            </article>

            <article className="dicaCard">
              <div className="dicaCard__image" />

              <div className="dicaCard__content">
                <span className="dicaCategoryTag">Manutenção</span>
                <h3>Checklist básico antes de pegar estrada</h3>
                <p>
                  Verificações simples que podem evitar problemas
                  e garantir uma viagem mais tranquila.
                </p>
                <button className="dicaReadMore">Ler mais</button>
              </div>
            </article>

            <article className="dicaCard">
              <div className="dicaCard__image" />

              <div className="dicaCard__content">
                <span className="dicaCategoryTag">Grupo</span>
                <h3>Como organizar um passeio em grupo com segurança</h3>
                <p>
                  Estratégias para manter organização, comunicação
                  e segurança durante o trajeto.
                </p>
                <button className="dicaReadMore">Ler mais</button>
              </div>
            </article>

          </div>

        </div>
      </section>

    </main>
  )
}