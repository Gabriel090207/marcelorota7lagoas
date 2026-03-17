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

  const handleSubmit = async () => {
    try {
      if (!titulo.trim() || !conteudo.trim() || conteudo === "<p></p>") {
        showToast("error", "Preencha título e conteúdo.")
        return
      }

      setLoading(true)

      let imageUrl = ""

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