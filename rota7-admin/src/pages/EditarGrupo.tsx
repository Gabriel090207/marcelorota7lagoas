import AdminLayout from "../components/admin/AdminLayout"
import { getGrupoById, updateGrupo } from "../services/api"
import { uploadImage } from "../services/storage"
import "./NovoGrupo.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

type ToastType = "success" | "error"

export default function EditarGrupo() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("")
  const [link, setLink] = useState("")
  const [descricao, setDescricao] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [imagemAtual, setImagemAtual] = useState("")

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

  useEffect(() => {
    if (!id) return

    getGrupoById(id).then((data) => {
      setNome(data.nome || "")
      setTipo(data.tipo || "")
      setLink(data.link || "")
      setImagemAtual(data.imagem || "")
     setDescricao(data.descricao || "")
    })
  }, [id])

  const handleSubmit = async () => {
    try {

      if (!nome || !tipo || !link) {
        showToast("error", "Preencha todos os campos")
        return
      }

      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await updateGrupo(id!, {
  nome,
  tipo,
  link,
  imagem: imageUrl,
  descricao
})

      showToast("success", "Grupo atualizado!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar grupo")
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

        <h1>Editar grupo</h1>

        <div className="form">

          <input
            className="input"
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
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
  className="input"
  value={descricao}
  onChange={(e) => setDescricao(e.target.value)}
/>

          <label className="uploadBox">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
            <span>{file ? file.name : "Alterar imagem"}</span>
          </label>

          {/* PREVIEW */}
          {(imagemAtual || file) && (
            <div className="novaNoticia__preview">
              <img
                src={file ? URL.createObjectURL(file) : imagemAtual}
              />
            </div>
          )}

          <button className="publishBtn" onClick={handleSubmit}>
            {loading ? "Salvando..." : "Salvar alterações"}
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