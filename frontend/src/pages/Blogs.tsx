import './Blogs.css'

import { FiSearch } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBlogs } from "../services/api"

export default function Blogs() {

  const [blogs, setBlogs] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todas")

  const navigate = useNavigate()

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

const outrosBlogs = blogsFiltrados

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
              Marcelão é um verdadeiro apaixonado pelo motociclismo raiz, daqueles que vivem a estrada
              com intensidade, respeito e espírito de liberdade. Com anos de experiência sobre duas rodas,
              já percorreu inúmeras rotas, participou de eventos, encontros e vivenciou de perto a cultura biker
              em sua essência.

              <br /><br />

              Seu olhar vai além da moto: ele traz histórias reais, aprendizados da estrada,
              situações vividas e reflexões que só quem realmente vive o motociclismo consegue compartilhar.

              <br /><br />

              Mais do que falar sobre motos, Marcelão compartilha um estilo de vida.
            </p>
          </div>

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

                  <button
                    className="blogReadMore"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    Ler mais
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>
      </section>

    </main>
  )
}