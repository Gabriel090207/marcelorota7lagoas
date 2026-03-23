import AdminLayout from "../components/admin/AdminLayout"
import EventDatePicker from "../components/forms/EventDatePicker"
import { uploadImage } from "../services/storage"
import { getEventoById, updateEvento } from "../services/api"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

import "./NovoEvento.css"

type ToastType = "success" | "error"

export default function EditarEvento() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [local, setLocal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tag, setTag] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [imagemAtual, setImagemAtual] = useState("")

  const [loading, setLoading] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<ToastType>("success")
  const [toastMessage, setToastMessage] = useState("")

  // 🔥 PARSE UNIVERSAL
  function parseEventoDate(dataStr: string) {
    if (!dataStr) return new Date()

    if (dataStr.includes("T")) {
      return new Date(dataStr)
    }

    const [datePart, timePart] = dataStr.split(" ")
    const [day, month, year] = datePart.split("/")
    const [hour = "00", minute = "00"] = (timePart || "").split(":")

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    )
  }

  useEffect(() => {
    if (!id) return

    getEventoById(id).then((data) => {

      setTitulo(data.titulo || "")
      setLocal(data.local || "")
      setDescricao(data.descricao || "")
      setTag(data.tag || "")
      setImagemAtual(data.imagem || "")

      if (data.data) {
        const date = parseEventoDate(data.data)

        const dia = String(date.getDate()).padStart(2, "0")
        const mes = String(date.getMonth() + 1).padStart(2, "0")
        const ano = date.getFullYear()

        setData(`${dia}/${mes}/${ano}`)

        setHora(
          `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
        )
      }

    })
  }, [id])

  const showToast = (type: ToastType, message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => setToastOpen(false), 3000)
  }

  const handleSubmit = async () => {

    if (!titulo || !data || !local) {
      showToast("error", "Preencha os campos obrigatórios")
      return
    }

    try {
      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      const [dia, mes, ano] = data.split("/")
      const isoDate = new Date(`${ano}-${mes}-${dia}T${hora}`)

      await updateEvento(id!, {
  titulo,
  local,
  descricao,
  imagem: imageUrl,
  data: isoDate.toISOString(),
  tag
})

      showToast("success", "Evento atualizado com sucesso!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar evento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>

      <main className="novaNoticia">

        <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

          <div className="adminToast__icon">
            {toastType === "success"
              ? <FiCheckCircle size={18} />
              : <FiAlertCircle size={18} />}
          </div>

          <div className="adminToast__content">
            <strong>{toastType === "success" ? "Sucesso" : "Erro"}</strong>
            <span>{toastMessage}</span>
          </div>

          <button className="adminToast__close" onClick={() => setToastOpen(false)}>
            <FiX size={18} />
          </button>

        </div>

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Editar evento</h1>

        <div className="form">

          <input
            type="text"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="formRow">

            <EventDatePicker value={data} onChange={setData} />

            <input
              type="time"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />

          </div>

          <input
            type="text"
            className="input"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />

          <input
  type="text"
  className="input"
  placeholder="Tag do evento (ex: Passeio, Trilha...)"
  value={tag}
  onChange={(e) => setTag(e.target.value)}
/>

          {imagemAtual && !file && (
            <div className="novaNoticia__preview">
              <img src={imagemAtual} />
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
            <span>{file ? file.name : "Trocar imagem"}</span>
          </label>

          <textarea
            className="input"
            rows={6}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
            className="publishBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}