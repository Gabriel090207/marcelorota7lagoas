import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import "./NovoBlog.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

type ToastType = "success" | "error"

const categoriasBlog = [
  "Experiências",
  "Viagens",
  "Eventos",
  "Opiniões"
]

export default function NovoBlog() {
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [imagensExtras, setImagensExtras] = useState<File[]>([])
  const [previewExtras, setPreviewExtras] = useState<string[]>([])

  const [legendaCapa, setLegendaCapa] = useState("")
const [legendasExtras, setLegendasExtras] = useState<string[]>([])

  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [previewImagem, setPreviewImagem] = useState("")
  const [loading, setLoading] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<ToastType>("success")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (type: ToastType, message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 3200)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewImagem(URL.createObjectURL(selectedFile))
    }
  }

 const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return

  const filesArray = Array.from(e.target.files)

  const previews = filesArray.map(file => URL.createObjectURL(file))

  // 🔥 AGORA ACUMULA
  setImagensExtras(prev => [...prev, ...filesArray])
setPreviewExtras(prev => [...prev, ...previews])
setLegendasExtras(prev => [
  ...prev,
  ...filesArray.map(() => "")
])
}

  const handleSubmit = async () => {
    try {
      if (!titulo.trim() || !conteudo.trim() || conteudo === "<p></p>") {
        showToast("error", "Preencha título e conteúdo.")
        return
      }

      setLoading(true)

      let imageUrl = ""

      let imagensUrls: string[] = []

if (imagensExtras.length > 0) {
  imagensUrls = await Promise.all(
    imagensExtras.map(img => uploadImage(img))
  )
}

      if (file) {
        imageUrl = await uploadImage(file)
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  titulo,
  conteudo,
  imagem: imageUrl,
  legendaCapa,
  imagens: imagensUrls,
  legendas: legendasExtras,
  categoria,
  autor: "Marcelão"
})
      })

      if (!res.ok) {
        throw new Error("Erro ao publicar blog")
      }

      await res.json()

      showToast("success", "Blog publicado com sucesso!")

      setTitulo("")
      setCategoria("")
      setConteudo("")
      setFile(null)
      setPreviewImagem("")
      setImagensExtras([])
      setPreviewExtras([])        

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao publicar blog.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novoBlog">

        <div
          className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}
        >
          <div className="adminToast__icon">
            {toastType === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
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

        <div
          className="novoBlog__back"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novoBlog__header">
          <h1>Novo blog</h1>
        </div>

        <div className="novoBlog__form">

          <input
            type="text"
            placeholder="Título do blog"
            className="novoBlog__input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="novoBlog__row">

            <div className="novoBlog__field">
              <label>Categoria</label>

              <select
                className="novoBlog__select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione</option>

                {categoriasBlog.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="novoBlog__field">
              <label>Imagem de capa</label>

              <label className="novoBlog__upload">
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <span>
                  {file ? file.name : "Selecionar imagem"}
                </span>
              </label>

              <input
  type="text"
  placeholder="Legenda da imagem de capa"
  className="input"
  value={legendaCapa}
  onChange={(e) => setLegendaCapa(e.target.value)}
/>


  {previewImagem && (
            <div className="novoBlog__preview">
              <img src={previewImagem} alt="Preview da capa" />
            </div>
          )}
            </div>

          </div>

        

          <RichTextEditor
  key={conteudo === "" ? "empty" : "filled"}
  content={conteudo}
  onChange={setConteudo}
/>


<div className="novoBlog__field">
  <label>Imagens do blog</label>

  <label className="novoBlog__upload">
    <input
      type="file"
      multiple
      onChange={handleMultipleImages}
    />
    <span>
      {imagensExtras.length > 0
        ? `${imagensExtras.length} imagens selecionadas`
        : "Selecionar imagens"}
    </span>
  </label>
</div>

{previewExtras.length > 0 && (
  <div className="novoBlog__galleryPreview">
    {previewExtras.map((img, index) => (
  <div key={index}>
    <img src={img} />

    <input
      type="text"
      placeholder="Legenda da imagem"
      className="input"
      value={legendasExtras[index] || ""}
      onChange={(e) => {
        const novas = [...legendasExtras]
        novas[index] = e.target.value
        setLegendasExtras(novas)
      }}
    />
  </div>
))}
  </div>
)}

          <button
            className="novoBlog__button"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "Publicando..." : "Publicar blog"}
          </button>

        </div>
      </main>
    </AdminLayout>
  )
}