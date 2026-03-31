import './Noticias.css'
import { FiSearch } from 'react-icons/fi'

import { useEffect, useState } from 'react'
import { getNoticias } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Noticias() {

  const [noticias, setNoticias] = useState<any[]>([])

  const [busca, setBusca] = useState("")
const [categoria, setCategoria] = useState("Todas")

  const navigate = useNavigate()

  useEffect(() => {
    getNoticias().then(setNoticias)
  }, [])


  const noticiasOrdenadasPorData = [...noticias].sort((a, b) => {
  const dateA = new Date(a.data || a.created_at || 0).getTime()
  const dateB = new Date(b.data || b.created_at || 0).getTime()

  return dateB - dateA // 🔥 mais recente primeiro
})

  const noticiasFiltradas = noticias.filter((n) => {


   

  const texto = busca.toLowerCase()

  const matchBusca =
    n.titulo?.toLowerCase().includes(texto) ||
    n.conteudo?.toLowerCase().includes(texto) ||
    n.categoria?.toLowerCase().includes(texto)

  const matchCategoria =
    categoria === "Todas" ||
    n.categoria === categoria

  return matchBusca && matchCategoria
})

 const ordemCategorias = [
  "Mercado",
  "Região",
  "Eventos",
  "Dicas",
  "Moto Clubes"
]

const noticiasOrdenadas = [...noticiasFiltradas].sort((a, b) => {
  const indexA = ordemCategorias.indexOf(a.categoria)
  const indexB = ordemCategorias.indexOf(b.categoria)

  // se não achar categoria, joga pro final
  if (indexA === -1) return 1
  if (indexB === -1) return -1

  return indexA - indexB
})

  return (
    <main className="newsPage">

      {/* HERO (usa primeira notícia) */}
     {categoria === "Todas" && busca === "" && noticiasFiltradas.length > 0 && ( 
        <section className="newsPage__hero">
          <div
            className="newsHeroImage"
            style={{
              backgroundImage: `url(${noticiasOrdenadasPorData[0]?.imagem || ""})`
            }}
          >
            <div className="newsHeroOverlay">

              <h1>{noticiasOrdenadasPorData[0]?.titulo}</h1>

              <p>
                {noticiasOrdenadasPorData[0]?.conteudo?.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>

              <button
                className="btn btn--primary"
                onClick={() => navigate(`/noticia/${noticiasOrdenadasPorData[0]?.id}`)}
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
         {["Todas", "Mercado", "Região", "Eventos", "Dicas", "Moto Clubes"].map(cat => (
  <button
    key={cat}
    className={`newsCategoryFilter ${categoria === cat ? "active" : ""}`}
    onClick={() => setCategoria(cat)}
  >
    {cat}
  </button>
))}
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
  value={busca}
  onChange={(e) => setBusca(e.target.value)}
/>
          </div>
        </div>
      </section>

      {/* LISTAGEM */}
      <section className="newsPage__list">

        <div className="newsPage__sectionHeader">
          <h2>Mais notíciaes</h2>
          <p>Confira as últimas novidades do portal Rota 7 Lagoas.</p>
        </div>

        <div className="newsPage__grid">

         {noticiasOrdenadas.map((noticia) => (

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