import './Noticias.css'
import { FiSearch } from 'react-icons/fi'

import { useEffect, useState } from 'react'
import { getNoticias } from '../services/api'
import { useNavigate } from 'react-router-dom'

import { getParceiros } from "../services/api"
import { SectionDivider } from '../components/SectionDivider/SectionDivider'

export default function Noticias() {


  const [parceiros, setParceiros] = useState<any[]>([])

  const [noticias, setNoticias] = useState<any[]>([])

  const [busca, setBusca] = useState("")
const [categoria, setCategoria] = useState("Todas")

  const navigate = useNavigate()

 useEffect(() => {
  getNoticias().then(setNoticias)
  getParceiros().then(setParceiros) // 🔥 novo
}, [])


 const parseNoticiaDate = (dataStr: string) => {
  if (!dataStr) return new Date(0)

  if (dataStr.includes("T")) {
    const d = new Date(dataStr)
    return isNaN(d.getTime()) ? new Date(0) : d
  }

  try {
    const [datePart, timePart] = dataStr.split(" ")
    const [day, month, year] = datePart.split("/")
    const [hour = "00", minute = "00"] = (timePart || "").split(":")

    const d = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    )

    return isNaN(d.getTime()) ? new Date(0) : d
  } catch {
    return new Date(0)
  }
}

const noticiasOrdenadasPorData = [...noticias].sort((a, b) => {
const dateA = a.data
  ? parseNoticiaDate(a.data).getTime()
  : new Date(a.created_at || 0).getTime()

const dateB = b.data
  ? parseNoticiaDate(b.data).getTime()
  : new Date(b.created_at || 0).getTime()

  return dateB - dateA
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


const parceirosAtivos = parceiros.filter(p => p.ativo)

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
                onClick={() => navigate(`/noticia/${noticiasOrdenadasPorData[0]?.slug || noticiasOrdenadasPorData[0]?.id}`)}
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
          <h2>Mais notícias</h2>
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
                  onClick={() => navigate(`/noticia/${noticia.slug || noticia.id}`)}
                >
                  Ler mais
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

          <SectionDivider />


      <section className="newsPage__partners">

  <div className="newsPage__partnersInner">

    <div className="newsPage__partnersHeader">
      <h2>Precisa de algo para sua moto?</h2>
<p>Conheça empresas parceiras que podem te ajudar agora mesmo.</p>
    </div>

    <div className="newsPage__partnersGrid">

      {parceirosAtivos.slice(0, 3).map((p) => (

        <div key={p.id} className="partnerCard">

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
  href={`https://wa.me/55${p.telefone?.replace(/\D/g, "")}`}
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

    </main>
  )
}