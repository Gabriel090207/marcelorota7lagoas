import "./EnviarFoto.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { uploadImage } from "../services/storage"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

type ToastType = "success" | "error"

export default function EnviarFoto() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [subtitulo, setSubtitulo] = useState("")
const [legenda, setLegenda] = useState("")

  const [loading, setLoading] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<ToastType>("success")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (type: ToastType, message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => setToastOpen(false), 3000)
  }

  const handleSubmit = async () => {
    try {

      if (!file || !categoria) {
        showToast("error", "Selecione imagem e categoria")
        return
      }

      setLoading(true)

      const imageUrl = await uploadImage(file)

      // 🔥 ENVIA COMO SOLICITAÇÃO
      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo: "galeria",
titulo,
subtitulo,
legenda,
categoria,
imagem: imageUrl
        })
      })

      showToast("success", "Imagem enviada para análise!")

      setTitulo("")
setSubtitulo("")
setLegenda("")
setCategoria("")
setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao enviar imagem")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="novaImagem">

      {/* VOLTAR */}
      <div
        className="novaNoticia__back"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      {/* HEADER */}
      <div className="novaImagem__header">
        <h1>Enviar foto</h1>
        <p>Envie sua foto para aparecer na galeria</p>
      </div>

      {/* FORM */}
      <div className="form">

        {/* TITULO */}
        <input
          type="text"
          placeholder="Título da imagem (opcional)"
          className="input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
  type="text"
  placeholder="Subtítulo (opcional)"
  className="input"
  value={subtitulo}
  onChange={(e) => setSubtitulo(e.target.value)}
/>

<input
  type="text"
  placeholder="Legenda da foto (opcional)"
  className="input"
  value={legenda}
  onChange={(e) => setLegenda(e.target.value)}
/>

        {/* CATEGORIA */}
        <select
          className="selectInput"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option>Passeios</option>
          <option>Trilhas</option>
          <option>Eventos</option>
          <option>Grupos</option>
        </select>

        {/* UPLOAD */}
        <label className="uploadBox">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0])
              }
            }}
          />
          <span>{file ? file.name : "Selecionar imagem"}</span>
        </label>

        {/* PREVIEW */}
        {file && (
          <div className="previewBox">
            <img src={URL.createObjectURL(file)} alt="preview" />
          </div>
        )}

        {/* BOTÃO */}
        <button className="publishBtn" onClick={handleSubmit}>
          {loading ? "Enviando..." : "Enviar imagem"}
        </button>

      </div>

      {/* TOAST */}
      <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

        <div className="adminToast__icon">
          {toastType === "success"
            ? <FiCheckCircle size={18} />
            : <FiAlertCircle size={18} />
          }
        </div>

        <div className="adminToast__content">
          <strong>
            {toastType === "success" ? "Sucesso" : "Erro"}
          </strong>
          <span>{toastMessage}</span>
        </div>

        <button
          className="adminToast__close"
          onClick={() => setToastOpen(false)}
        >
          <FiX size={18} />
        </button>

      </div>

    </main>
  )
}