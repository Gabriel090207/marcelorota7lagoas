import './Dicas.css'

import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { getDicas } from "../services/api"
import { useNavigate } from "react-router-dom"

import { getParceiros } from "../services/api"
import { SectionDivider } from '../components/SectionDivider/SectionDivider'


export default function Dicas() {

   const [parceiros, setParceiros] = useState<any[]>([])
    const parceirosAtivos = parceiros.filter(p => p.ativo)


  const [dicas, setDicas] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  const dicasOrdenadas = [...dicas].sort((a, b) => {
  const dateA = new Date(a.data || a.created_at || 0).getTime()
  const dateB = new Date(b.data || b.created_at || 0).getTime()

  return dateB - dateA // mais recente primeiro
})

  const navigate = useNavigate()

  useEffect(() => {
     getParceiros().then(setParceiros) 
    getDicas()
      .then(setDicas)
      .catch(console.error)
  }, [])

  if (!dicas.length) {
    return <div style={{ padding: 40 }}>Carregando dicas...</div>
  }

  const dicasFiltradas = dicasOrdenadas.filter((d) => {
  const texto = busca.toLowerCase()

  const matchBusca =
    d.titulo?.toLowerCase().includes(texto) ||
    d.conteudo?.toLowerCase().includes(texto)

  const matchCategoria =
    categoria === "Todas" ||
    d.categoria === categoria

  return matchBusca && matchCategoria
})



  // 🔥 DESTAQUE + GRID
  const destaque = categoria === "Todas" ? dicasOrdenadas[0] : null
const ordemCategorias = ["Pilotagem", "Segurança", "Manutenção"]

const outrasDicas = [...dicasFiltradas].sort((a, b) => {
  return (
    ordemCategorias.indexOf(a.categoria) -
    ordemCategorias.indexOf(b.categoria)
  )
})

  

  return (
    <main className="dicas">

      {/* HEADER */}
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
            manutenção e experiências da comunidade motociclista.
          </p>
        </div>
      </section>

      {/* DESTAQUE */}
      {destaque && (
        <section className="dicas__featured">
          <div className="dicas__featuredInner">

            <div
              className="featuredDica__image"
              style={{
                backgroundImage: `url(${destaque.imagem})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            <div className="featuredDica__content">
              <span className="dicaCategoryTag">
                {destaque.categoria}
              </span>

              <h2>{destaque.titulo}</h2>

              <p>
                {destaque.conteudo
                  ?.replace(/<[^>]+>/g, "")
                  .slice(0, 140)}...
              </p>

              <span className="newsHeroDate">
  Publicado em{" "}
  {(() => {
    const d = destaque.data
      ? new Date(destaque.data)
      : new Date(destaque.created_at * 1000)

    return d.toLocaleDateString("pt-BR")
  })()}
</span>

              <button
                className="btn btn--primary"
                onClick={() => navigate(`/dicas/${destaque.slug || destaque.id}`)}
              >
                Ler artigo completo
              </button>
            </div>

          </div>
        </section>
      )}

      {/* CATEGORIAS */}
      <section className="dicas__categories">
        <div className="dicas__categoriesInner">

          {["Todas", "Pilotagem", "Segurança", "Manutenção"].map((cat) => (
            <button
              key={cat}
              className={`dicasCategoryFilter ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}

        </div>
      </section>

      {/* BUSCA */}
      <section className="dicas__search">
        <div className="dicas__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar dicas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="dicas__gridSection">
        <div className="dicas__gridInner">

          <div className="dicasGrid">

            {outrasDicas.map((dica) => (
              <article key={dica.id} className="dicaCard">

                <div
                  className="dicaCard__image"
                  style={{
                    backgroundImage: `url(${dica.imagem})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />

                <div className="dicaCard__content">

                  <span className="dicaCategoryTag">
                    {dica.categoria}
                  </span>

                  <h3>{dica.titulo}</h3>

                  <p>
                    {dica.conteudo
                      ?.replace(/<[^>]+>/g, "")
                      .slice(0, 100)}...
                  </p>

                  <div className="newsFooter">

  <span className="newsDate">
    Publicado em{" "}
    {(() => {
      const d = dica.data
        ? new Date(dica.data)
        : new Date(dica.created_at * 1000)

      return d.toLocaleDateString("pt-BR")
    })()}
  </span>

  <button
    className="btn btn--outline newsReadMore"
    onClick={() => navigate(`/dicas/${dica.slug || dica.id}`)}
  >
    Ler mais
  </button>

</div>

                </div>

              </article>
            ))}

          </div>

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