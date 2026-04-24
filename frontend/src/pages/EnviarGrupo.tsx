import "./EnviarGrupo.css"

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

export default function EnviarGrupo() {

  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("")
  const [link, setLink] = useState("")
  const [descricao, setDescricao] = useState("")
  const [responsavel, setResponsavel] = useState("")
  const [telefone, setTelefone] = useState("")
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

      if (!nome || !tipo || !link || !responsavel || !telefone) {
        showToast("error", "Preencha todos os campos obrigatórios")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      // 🔥 ENVIA PARA SOLICITAÇÕES
      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo: "grupo",
          nome,
          tipoGrupo: tipo,
          link,
          descricao,
          imagem: imageUrl,
          responsavel,
          telefone
        })
      })

      showToast("success", "Grupo enviado para análise!")

      // LIMPAR
      setNome("")
      setTipo("")
      setLink("")
      setDescricao("")
      setResponsavel("")
      setTelefone("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao enviar grupo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="enviarGrupo">

      {/* TOAST */}
      <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>
        <div className="adminToast__icon">
          {toastType === "success"
            ? <FiCheckCircle size={18} />
            : <FiAlertCircle size={18} />
          }
        </div>

        <div className="adminToast__content">
          <strong>{toastType === "success" ? "Sucesso" : "Erro"}</strong>
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
      <div
        className="novaNoticia__back"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
        <span>Voltar</span>
      </div>

      {/* HEADER */}
      <div className="enviarGrupo__header">
        <h1>Enviar grupo</h1>
        <p>Envie seu grupo para aparecer no portal</p>
      </div>

      {/* FORM */}
      <div className="form">

        <input
          className="input"
          placeholder="Nome do grupo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

       <select
  className="selectInput"
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
>
  <option value="">Tipo</option>
  <option>WhatsApp</option>
  <option>Telegram</option>
  <option>Instagram</option>
  <option>Discord</option>
</select>

        <input
          className="input"
          placeholder="Link do grupo"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          className="input"
          placeholder="Nome do responsável"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
        />

        <input
          className="input"
          placeholder="Telefone do responsável"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <textarea
          className="input textarea"
          placeholder="Descrição do grupo"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

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
          <span>{file ? file.name : "Selecionar imagem de capa"}</span>
        </label>

        {/* PREVIEW */}
        {file && (
          <div className="previewBox">
            <img src={URL.createObjectURL(file)} />
          </div>
        )}

        <button
          className="publishBtn"
          onClick={handleSubmit}
        >
          {loading ? "Enviando..." : "Enviar grupo"}
        </button>

      </div>

    </main>
  )
}