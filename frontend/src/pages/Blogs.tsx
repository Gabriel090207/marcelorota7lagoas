import './Blogs.css'

import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBlogs } from "../services/api"

import { SectionDivider } from '../components/SectionDivider/SectionDivider'
import { getParceiros } from "../services/api"



export default function Blogs() {

    const [parceiros, setParceiros] = useState<any[]>([])
    const parceirosAtivos = parceiros.filter(p => p.ativo)

  const [blogs, setBlogs] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  const navigate = useNavigate()


  useEffect(() => {
   
    getParceiros().then(setParceiros) // 🔥 novo
  }, [])

  useEffect(() => {
    
    getBlogs()
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data)
        } else {
          setBlogs([])
        }
      })
      .catch(() => setBlogs([]))
  }, [])

const blogsFiltrados = blogs.filter((b) => {
  const texto = busca.toLowerCase()

  const matchBusca =
    b.titulo?.toLowerCase().includes(texto) ||
    b.conteudo?.toLowerCase().includes(texto)

  const matchCategoria =
    categoria === "Todas" ||
    b.categoria === categoria

  return matchBusca && matchCategoria
})

const outrosBlogs = [...blogsFiltrados].sort((a, b) => {
  const dateA = a.data
    ? new Date(a.data).getTime()
    : new Date(a.created_at * 1000).getTime()

  const dateB = b.data
    ? new Date(b.data).getTime()
    : new Date(b.created_at * 1000).getTime()

  return dateB - dateA
})


  return (
    <main className="blogs">

      {/* HEADER */}
      <section className="blogs__header">
        <div className="blogs__headerInner">
          <span className="blogs__label">
            BLOG DO MARCELÃO
          </span>

          <h1>
            Vivências reais no mundo das motos
          </h1>

          <p>
            Histórias, experiências e visão de estrada de quem vive o motociclismo de verdade.
          </p>
        </div>
      </section>


        {/* CATEGORIAS */}
      <section className="blogs__categories">
        <div className="blogs__categoriesInner">

          {["Todas", "Experiências", "Viagens", "Eventos", "Opiniões"].map((cat) => (
            <button
              key={cat}
              className={`blogsCategoryFilter ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}

        </div>
      </section>


      {/* BUSCA */}
      <section className="blogs__search">
        <div className="blogs__searchInner">
          <div className="searchInputWrapper">
            <FiSearch size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar blogs..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="blogs__gridSection">
        <div className="blogs__gridInner">

          <div className="blogsGrid">

            {Array.isArray(outrosBlogs) && outrosBlogs.map((blog) => (

              <article key={blog.id} className="blogCard">

                <div
                  className="blogCard__image"
                  style={{
                    backgroundImage: `url(${blog.imagem || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />

                <div className="blogCard__content">

                  <span className="blogCategoryTag">
                    {blog.categoria}
                  </span>

                  <h3>{blog.titulo}</h3>

                  <p>
                    {blog.conteudo
                      ?.replace(/<[^>]+>/g, "")
                      .slice(0, 100)}...
                  </p>

                  <div className="blogFooter">

 <span className="newsDate">
  Publicado em{" "}
  {(() => {
    let d = new Date(0)

    if (blog.data) {
      d = new Date(blog.data)
    } else if (blog.created_at) {
      d = new Date(blog.created_at * 1000)
    }

    return d.toLocaleDateString("pt-BR")
  })()}
</span>

<button
  className="btn btn--outline newsReadMore"
  onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
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



       {/* DESTAQUE (AUTOR) */}
      <section className="blogs__featured">
        <div className="blogs__featuredInner">

          <div
            className="featuredBlog__image"
            style={{
              backgroundImage: `url('/marcelo.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <div className="featuredBlog__content">

            <span className="blogCategoryTag">
              SOBRE O AUTOR
            </span>

            <h2>Marcelão</h2>

            <p>
             Marcelo Guimarães (Marcelão) é apaixonado pelo motociclismo. Com pouco tempo na estrada, procura viver as viagens com respeito e espírito de liberdade. Seu olhar vai além da moto: ele busca e traz histórias reais, aprendizados com as situações vividas, e reflexões. Para ele, motociclismo é um estilo de vida.

            
            </p>
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