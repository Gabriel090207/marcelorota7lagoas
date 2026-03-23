import AdminLayout from "../components/admin/AdminLayout"
import EventDatePicker from "../components/forms/EventDatePicker"

import { uploadImage } from "../services/storage"
import { createEvento } from "../services/api"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

import "./NovoEvento.css"

type ToastType = "success" | "error"

export default function NovoEvento() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [local, setLocal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tag, setTag] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔥 TOAST
  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<ToastType>("success")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (type: ToastType, message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 3000)
  }

  const handleSubmit = async () => {
    try {

      if (!titulo.trim() || !data || !local.trim()) {
        showToast("error", "Preencha os campos obrigatórios.")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await createEvento({
  titulo,
  data: `${data} ${hora}`,
  local,
  descricao,
  imagem: imageUrl,
  tag
})

      showToast("success", "Evento criado com sucesso!")

      // 🔥 LIMPAR TUDO
      setTitulo("")
      setData("")
      setHora("")
      setLocal("")
      setDescricao("")
      setTag("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao criar evento.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>

      <main className="novaNoticia">

        {/* 🔥 TOAST */}
        <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

          <div className="adminToast__icon">
            {toastType === "success"
              ? <FiCheckCircle size={18} />
              : <FiAlertCircle size={18} />}
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
          >
            <FiX size={18} />
          </button>

        </div>

        {/* VOLTAR */}
        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Novo evento</h1>

        <div className="form">

          <input
            type="text"
            placeholder="Título do evento"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="formRow">

            <EventDatePicker
              value={data}
              onChange={setData}
            />

            <input
              type="time"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />

          </div>

          <input
            type="text"
            placeholder="Local do evento"
            className="input"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />


          <input
  type="text"
  placeholder="Tag do evento (ex: Passeio, Trilha...)"
  className="input"
  value={tag}
  onChange={(e) => setTag(e.target.value)}
/>

          {/* PREVIEW */}
          {file && (
            <div className="novaNoticia__preview">
              <img src={URL.createObjectURL(file)} />
            </div>
          )}

          <label className="uploadBox">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
            <span>{file ? file.name : "Selecionar imagem"}</span>
          </label>

          <textarea
            className="input"
            rows={6}
            placeholder="Descrição do evento"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
            className="publishBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar evento"}
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}