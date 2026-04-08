import { Link } from 'react-router-dom'
import { 
  FiCalendar,  
  FiTool, 
  FiShoppingBag, 
  FiUsers,
  FiImage,
  FiBookOpen
} from 'react-icons/fi'

import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

import './Home.css'
import news1 from '../assets/images/news/news-1.jpg'

import { getParceiros } from "../services/api"

import { SectionDivider } from '../components/SectionDivider/SectionDivider'

import { useEffect, useState } from "react"
import { getNoticias, getEventos, getGrupos, getImagens, getBlogs } from "../services/api"

export default function Home() {


const [noticias, setNoticias] = useState<any[]>([])
const [blogs, setBlogs] = useState<any[]>([])
const [eventos, setEventos] = useState<any[]>([])
const [grupos, setGrupos] = useState<any[]>([])
const [imagens, setImagens] = useState<any[]>([])
const [newsIndex, setNewsIndex] = useState(0)


const [email, setEmail] = useState("")
const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<"success" | "error">("success")
const [toastMessage, setToastMessage] = useState("")


const showToast = (type: "success" | "error", message: string) => {
  setToastType(type)
  setToastMessage(message)
  setToastOpen(true)

  setTimeout(() => {
    setToastOpen(false)
  }, 3200)
}

const parseEventoDate = (dataStr: string) => {
  if (!dataStr) return null

  if (dataStr.includes("T")) {
    const d = new Date(dataStr)
    return isNaN(d.getTime()) ? null : d
  }

  try {
    const [datePart, timePart] = dataStr.split(" ")
    if (!datePart) return null

    const [day, month, year] = datePart.split("/")
    const [hour = "00", minute = "00"] = (timePart || "").split(":")

    const d = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    )

    return isNaN(d.getTime()) ? null : d
  } catch {
    return null
  }
}

const meses = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
]

const hoje = new Date()

const proximosEventos = eventos
  .map((evento) => ({
    ...evento,
    date: parseEventoDate(evento.data)
  }))
  .filter((evento) => evento.date && evento.date >= hoje)
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3)

  const [parceiros, setParceiros] = useState<any[]>([])

useEffect(() => {
  getNoticias().then(data => setNoticias(data || []))
  getBlogs().then(data => setBlogs(data || []))
  getEventos().then(data => setEventos(data || []))
  getGrupos().then(data => setGrupos(data || []))
  getImagens().then(data => setImagens(data || []))
  getParceiros().then(data => setParceiros(data || [])) // 🔥 NOVO
}, [])

useEffect(() => {
 if (alternados.length <= 1) return

const interval = setInterval(() => {
  setNewsIndex((prev) =>
    prev === alternados.length - 1 ? 0 : prev + 1
  )
}, 5000)

  return () => clearInterval(interval)
}, [noticias])


const handleNewsletter = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })

    if (!res.ok) throw new Error()

    setEmail("")
    showToast("success", "Email cadastrado com sucesso!")

  

  } catch {
    showToast("error", "Erro ao cadastrar email.")
  }
}


const parceirosAtivos = parceiros.filter(p => p.ativo)
  




const blogsOrdenados = [...blogs]
  .sort((a, b) => {
    const dateA = new Date(a.data || a.created_at || 0).getTime()
    const dateB = new Date(b.data || b.created_at || 0).getTime()
    return dateB - dateA
  })
  .slice(0, 6)

const noticiasOrdenadas = [...noticias]
  .sort((a, b) => {
    const dateA = new Date(a.data || a.created_at || 0).getTime()
    const dateB = new Date(b.data || b.created_at || 0).getTime()
    return dateB - dateA
  })
 .slice(0, 6)

const alternados = []

for (let i = 0; i < 6; i++) {
  if (noticiasOrdenadas[i]) {
    alternados.push({ ...noticiasOrdenadas[i], tipo: "noticia" })
  }

  if (blogsOrdenados[i]) {
    alternados.push({ ...blogsOrdenados[i], tipo: "blog" })
  }
}

  return (
    <main className="home">

     
     {/* HERO NOTÍCIAS */}
{noticias.length > 0 && (
  <section className="homeNewsHero">

    <div className="homeNewsHero__slider">
      {alternados.map((item, index) => (
       <div
  key={`${item.tipo}-${item.id}`}
  className={`homeNewsHero__slide ${index === newsIndex ? "active" : ""}`}
  style={{
    backgroundImage: `url(${item.imagem || news1})`
  }}
>
          <div className="homeNewsHero__overlay">
            <div className="homeNewsHero__content">

             <span className="homeNewsHero__category">
  {item.tipo === "blog" ? "Blog" : item.categoria || "Notícia"}
</span>

<h1>{item.titulo}</h1>

<p>
  {item.conteudo
    ?.replace(/<[^>]+>/g, "")
    .slice(0, 140)}...
</p>

              <div className="homeNewsHero__actions">

  <button
    className="btn btn--primary"
  onClick={() => {
  const url =
    item.tipo === "blog"
      ? `/blog/${item.slug ?? item.id}`
      : `/noticia/${item.slug ?? item.id}`

  window.location.href = url
}}
  >
    Ler matéria completa
  </button>

 <button
  className="btn btn--outline"
  onClick={() =>
    window.location.href =
      item.tipo === "blog" ? "/blogs" : "/noticias"
  }
>
  {item.tipo === "blog" ? "Ver blogs" : "Ver notícias"}
</button>

</div>

            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="homeNewsHero__dots">
      {alternados.map((_, index) => (
        <button
          key={index}
          className={index === newsIndex ? "active" : ""}
          onClick={() => setNewsIndex(index)}
        />
      ))}
    </div>

  </section>
)}



      {/* ATALHOS RÁPIDOS */}
<section className="home__shortcuts">
  <div className="home__shortcutsInner">
    <div className="home__shortcutsHeader">
      <h2>Acesso rápido</h2>
      <p>Explore o portal: eventos, blog, dicas e o mercado motociclístico da região.</p>
    </div>

    <div className="home__shortcutsContainer">

      <Link to="/eventos" className="shortcutCard">
        <div className="shortcutIcon">
          <FiCalendar size={20} />
        </div>
        <h3>Agenda & Eventos</h3>
        <p>Encontros, passeios e trilhas da região.</p>
      </Link>

     <Link to="/blogs" className="shortcutCard">
  <div className="shortcutIcon">
    <FiBookOpen size={20} />
  </div>
  <h3>Blog</h3>
  <p>Experiências, histórias e vivências no mundo das motos.</p>
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

        <SectionDivider />

{/* MOTO CLUBES & GRUPOS */}
<section className="home__clubs">
  <div className="home__clubsInner">

    <div className="home__clubsHeader">
      <div>
        <span className="clubsLabel">
          <FiUsers size={14} />
          Comunidade
        </span>
        <h2>Moto Clubes & Grupos da Região</h2>
        <p>
          Conheça os grupos que movimentam o motociclismo
          em Sete Lagoas e entorno.
        </p>
      </div>

      <Link to="/grupos" className="btn btn--outline">
        Ver todos os grupos
      </Link>
    </div>

    <div className="home__clubsGrid">

      {grupos.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
          Nenhum grupo cadastrado
        </p>
      ) : (
        grupos.slice(0, 3).map((grupo) => (
  <article key={grupo.id} className="grupoCard">

    <div
      className="grupoCard__image"
      style={{
        backgroundImage: `url(${grupo.imagem || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />

    <div className="grupoCard__content">

      <h3>{grupo.nome}</h3>

      <span className="grupoTipo">
        {grupo.tipo || "Grupo"}
      </span>

      <p>
        {grupo.descricao
          ?.replace(/<[^>]+>/g, "")
          .slice(0, 100) || "Grupo da comunidade motociclística da região."}...
      </p>

      <a
        href={grupo.link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--outline"
      >
        Entrar no Grupo
      </a>

    </div>

  </article>
))
      )}

    </div>

  </div>
</section>

<SectionDivider />

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

      {proximosEventos.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
          Nenhum evento próximo cadastrado
        </p>
      ) : (
        proximosEventos.map((evento) => (
          <article key={evento.id} className="eventCard">

            <div className="eventDate">
              <span className="eventDay">
                {String(evento.date.getDate()).padStart(2, "0")}
              </span>
              <span className="eventMonth">
                {meses[evento.date.getMonth()]}
              </span>
            </div>

            <div className="eventInfo">
              <h3>{evento.titulo}</h3>
              <p>{evento.local}</p>

              <div className="eventTags">
                <span className="tag">
                  {evento.date.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
                <span className="tag">
  {evento.tag || "Evento"}
</span>
              </div>
            </div>

          </article>
        ))
      )}

    </div>
  </div>
</section>



{/* MERCADO & PARCEIROS */}
<section className="home__market">
  <div className="home__marketInner">

    <div className="home__marketLeft">
      <span className="marketLabel">
  <FiShoppingBag size={14} />
  Mercado Regional
</span>
      <h2>Empresas que movem a Rota 7</h2>
      <p>
       Oficinas, lojas e serviços que movem a Rota 7.
      </p>

      <div className="marketActions">
        <Link to="/classificados" className="btn btn--primary">
          Ver classificados
        </Link>

        <Link
  to="/quero-anunciar"
  className="btn btn--outline"
>
  Quero anunciar
</Link>
      </div>
    </div>

    <div className="home__marketRight">

  {parceiros.length === 0 ? (
    <p style={{ opacity: 0.6 }}>
      Nenhum parceiro cadastrado
    </p>
  ) : (
   parceirosAtivos.slice(0, 4).map((parceiro) => (

      <div key={parceiro.id} className="marketItem">

        <div>
          <h4>{parceiro.nome}</h4>
          <span>{parceiro.categoria || "Parceiro"}</span>
        </div>

        <a
  href={
    parceiro.whatsapp
      ? `https://wa.me/${parceiro.whatsapp.replace(/\D/g, "")}`
      : "#"
  }
  target="_blank"
  rel="noopener noreferrer"
>
  WhatsApp
</a>

      </div>

    ))
  )}

</div>

  </div>
</section>

{/* GALERIA */}
<section className="home__gallery">
  <div className="home__galleryInner">

    <div className="home__galleryHeader">
      <div>
        <span className="galleryLabel">
          <FiImage size={14} />
          Momentos da Comunidade
        </span>
        <h2>Galeria Rota 7 Lagoas</h2>
        <p>
          Registros de encontros, passeios, trilhas e momentos
          que fortalecem o motociclismo na região.
        </p>
      </div>

      <Link to="/galeria" className="btn btn--outline">
        Ver galeria completa
      </Link>
    </div>

    <div className="home__galleryGrid">

      {imagens.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
          Nenhuma imagem cadastrada
        </p>
      ) : (
        imagens.slice(0, 5).map((img) => (
          <div
            key={img.id}
            className="galleryItem"
            style={{
              backgroundImage: `url(${img.url || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ))
      )}

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

      <form className="newsletterForm" onSubmit={handleNewsletter}>
  <input 
    type="email" 
    placeholder="Seu melhor e-mail"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <button type="submit">
    Quero receber
  </button>
</form>

    </div>

  </div>
</section>


<div
  className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}
>
  <div className="adminToast__icon">
    {toastType === "success" ? (
      <FiCheckCircle size={18} />
    ) : (
      <FiAlertCircle size={18} />
    )}
  </div>

  <div className="adminToast__content">
    <strong>
      {toastType === "success" ? "Sucesso" : "Atenção"}
    </strong>
    <span>{toastMessage}</span>
  </div>

  <button
    className="adminToast__close"
    onClick={() => setToastOpen(false)}
    type="button"
  >
    <FiX size={18} />
  </button>
</div>

    </main>
  )
}