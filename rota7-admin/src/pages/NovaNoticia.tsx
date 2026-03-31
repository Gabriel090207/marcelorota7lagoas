import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import "./NovaNoticia.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

import { categorias } from "../constants/categorias"

type ToastType = "success" | "error"

export default function NovaNoticia() {
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [imagensExtras, setImagensExtras] = useState<File[]>([])
const [previewExtras, setPreviewExtras] = useState<string[]>([])
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
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

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return

  const filesArray = Array.from(e.target.files)
  const previews = filesArray.map(file => URL.createObjectURL(file))

  setImagensExtras(prev => [...prev, ...filesArray])
  setPreviewExtras(prev => [...prev, ...previews])
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/noticias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  titulo,
  conteudo,
  imagem: imageUrl,
  imagens: imagensUrls,
  categoria,
  autor: "Admin"
})
      })

      if (!res.ok) {
        throw new Error("Erro ao publicar notícia")
      }

      await res.json()

      showToast("success", "Notícia publicada com sucesso!")

      // limpar formulário
      setTitulo("")
      setCategoria("")
      setConteudo("")
      setFile(null)
      setImagensExtras([])
setPreviewExtras([])

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao publicar notícia.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novaNoticia">

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
          className="novaNoticia__back"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novaNoticia__header">
          <h1>Nova notícia</h1>
        </div>

        <div className="form">

          <input
            type="text"
            placeholder="Título da notícia"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="formRow">

            <div className="field">
              <label>Categoria</label>

              <select
                className="selectInput"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione</option>

                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Imagem de capa</label>

              <label className="uploadBox">
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0])
                    }
                  }}
                />
                <span>
                  {file ? file.name : "Selecionar imagem"}
                </span>
              </label>

            </div>

          </div>

          <RichTextEditor content={conteudo} onChange={setConteudo} />


<div className="field">
  <label>Imagens da notícia</label>

  <label className="uploadBox">
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
  <div className="galleryPreview">
    {previewExtras.map((img, index) => (
      <img key={index} src={img} />
    ))}
  </div>
)}

          <button
            className="publishBtn"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "Publicando..." : "Publicar notícia"}
          </button>

        </div>
      </main>
    </AdminLayout>
  )
}