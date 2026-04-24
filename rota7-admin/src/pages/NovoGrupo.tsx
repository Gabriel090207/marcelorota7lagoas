
import AdminLayout from "../components/admin/AdminLayout"
import { createGrupo } from "../services/api"
import { uploadImage } from "../services/storage"
import "./NovoGrupo.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

type ToastType = "success" | "error"

export default function NovoGrupo() {

  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("")
  const [link, setLink] = useState("")
  const [descricao, setDescricao] = useState("")
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

      if (!nome || !tipo || !link) {
        showToast("error", "Preencha todos os campos")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await createGrupo({
  nome,
  tipo,
  link,
  imagem: imageUrl,
  descricao
})

      showToast("success", "Grupo criado com sucesso!")

      setNome("")
      setTipo("")
      setLink("")
      setDescricao("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao criar grupo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novoGrupo">

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Novo grupo</h1>

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

          <textarea
  className="input"
  placeholder="Descrição do grupo"
  value={descricao}
  onChange={(e) => setDescricao(e.target.value)}
/>

          {/* UPLOAD */}
          <label className="uploadBox">
            <input
              type="file"
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
            <div className="novaNoticia__preview">
              <img src={URL.createObjectURL(file)} />
            </div>
          )}

          <button className="publishBtn" onClick={handleSubmit}>
            {loading ? "Salvando..." : "Criar grupo"}
          </button>

        </div>

        {/* TOAST */}
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

      </main>
    </AdminLayout>
  )
}