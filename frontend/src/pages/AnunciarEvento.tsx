import "./AnunciarEvento.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { uploadImage } from "../services/storage"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone
} from "react-icons/fi"

type ToastType = "success" | "error"

export default function AnunciarEvento() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [local, setLocal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tag, setTag] = useState("")
  const [responsavel, setResponsavel] = useState("")
  const [contato, setContato] = useState("")
  const [file, setFile] = useState<File | null>(null)

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

      if (!titulo || !data || !local || !responsavel || !contato) {
        showToast("error", "Preencha os campos obrigatórios")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  tipo: "evento",
  titulo,
  data: `${data} ${hora}`,
  local,
  descricao,
  responsavel,
  contato,
  imagem: imageUrl,
  tag
})
      })

      showToast("success", "Evento enviado para análise!")

      setTitulo("")
      setData("")
      setHora("")
      setLocal("")
      setDescricao("")
      setTag("")
      setResponsavel("")
      setContato("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao enviar evento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="anunciarEvento">

      {/* TOAST */}
      <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>
        <div className="adminToast__icon">
          {toastType === "success"
            ? <FiCheckCircle size={18} />
            : <FiAlertCircle size={18} />
          }
        </div>

        <div className="adminToast__content">
          <strong>{toastType === "success" ? "Sucesso" : "Atenção"}</strong>
          <span>{toastMessage}</span>
        </div>

        <button className="adminToast__close" onClick={() => setToastOpen(false)}>
          <FiX size={18} />
        </button>
      </div>

      {/* VOLTAR */}
      <div className="novaNoticia__back" onClick={() => navigate(-1)}>
        <FiArrowLeft size={18} />
        <span>Voltar</span>
      </div>

      <div className="anunciarEvento__header">
        <h1>Enviar evento</h1>
      </div>

      <div className="form">

        {/* TÍTULO */}
        <input
          className="input"
          placeholder="Título do evento"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        {/* DATA + HORA */}
        <div className="formRow">

          <div className="inputGroup">
            <FiCalendar className="inputGroup__icon" />
            <input
              type="date"
              className="input"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <FiClock className="inputGroup__icon" />
            <input
              type="time"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

        </div>

        {/* LOCAL */}
        <input
          className="input"
          placeholder="Local do evento"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />


        <input
  className="input"
  placeholder="Tag do evento (ex: Passeio, Trilha...)"
  value={tag}
  onChange={(e) => setTag(e.target.value)}
/>

        {/* RESPONSÁVEL */}
        <div className="inputGroup">
          <FiUser className="inputGroup__icon" />
          <input
            className="input"
            placeholder="Responsável pelo evento"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          />
        </div>

        {/* CONTATO */}
        <div className="inputGroup">
          <FiPhone className="inputGroup__icon" />
          <input
            className="input"
            placeholder="Contato (WhatsApp ou telefone)"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>

        {/* IMAGEM */}
        <div className="field">
          <label>Imagem</label>

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
            <span>{file ? "Trocar imagem" : "Selecionar imagem"}</span>
          </label>

          {file && (
            <div className="previewBox">
              <img src={URL.createObjectURL(file)} />

              <button className="removeImage" onClick={() => setFile(null)}>
                <FiX />
              </button>
            </div>
          )}
        </div>

        {/* DESCRIÇÃO */}
        <textarea
          className="textarea"
          placeholder="Descrição do evento"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button className="publishBtn" onClick={handleSubmit}>
          {loading ? "Enviando..." : "Enviar evento"}
        </button>

      </div>
    </main>
  )
}