import './Noticias.css'
import { FiSearch } from 'react-icons/fi'

import { useEffect, useState } from 'react'
import { getNoticias } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Noticias() {

  const [noticias, setNoticias] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getNoticias().then(setNoticias)
  }, [])

  return (
    <main className="newsPage">

      {/* HERO (usa primeira notícia) */}
      {noticias.length > 0 && (
        <section className="newsPage__hero">
          <div
            className="newsHeroImage"
            style={{
              backgroundImage: `url(${noticias[0].imagem || ""})`
            }}
          >
            <div className="newsHeroOverlay">

              <h1>{noticias[0].titulo}</h1>

              <p>
                {noticias[0].conteudo?.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>

              <button
                className="btn btn--primary"
                onClick={() => navigate(`/noticia/${noticias[0].id}`)}
              >
                Ler matéria completa
              </button>

            </div>
          </div>
        </section>
      )}

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

      {/* BUSCA */}
      <section className="newsPage__search">
        <div className="newsPage__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar notícias, mercado, eventos..."
            />
          </div>
        </div>
      </section>

      {/* LISTAGEM */}
      <section className="newsPage__list">

        <div className="newsPage__sectionHeader">
          <h2>Mais notícias</h2>
          <p>Confira as últimas novidades do portal Rota 7 Lagoas.</p>
        </div>

        <div className="newsPage__grid">

          {noticias.map((noticia) => (

            <article key={noticia.id} className="newsCard">

              <div
                className="newsImage"
                style={{
                  backgroundImage: `url(${noticia.imagem || ""})`
                }}
              />

              <div className="newsContent">

                <span className="newsCategory">
                  {noticia.categoria || "Notícia"}
                </span>

                <h3>{noticia.titulo}</h3>

                <p>
                  {noticia.conteudo
                    ?.replace(/<[^>]+>/g, "")
                    .slice(0, 100)}...
                </p>

                <button
                  className="btn btn--outline newsReadMore"
                  onClick={() => navigate(`/noticia/${noticia.id}`)}
                >
                  Ler mais
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  )
}