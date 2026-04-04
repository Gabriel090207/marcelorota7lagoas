import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getNoticiaBySlug } from "../services/api"
import { Helmet } from "react-helmet-async"

export default function PreviewNoticia() {
  const { id } = useParams()
  const [noticia, setNoticia] = useState<any>(null)

  useEffect(() => {
    if (id) {
      getNoticiaBySlug(id).then(setNoticia)
    }
  }, [id])

  if (!noticia) return null

  const url = `https://rota7lagoas.com.br/noticia/${noticia.slug || noticia.id}`

  return (
    <>
      <Helmet>
        <title>{noticia.titulo}</title>

        <meta property="og:title" content={noticia.titulo} />
        <meta property="og:description" content={noticia.titulo} />
        <meta property="og:image" content={noticia.imagem} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
      </Helmet>

      <script>
        {`
          setTimeout(() => {
            window.location.href = "${url}"
          }, 1000)
        `}
      </script>
    </>
  )
}