import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import { getDicaById, updateDica } from "../services/api"
import "./NovaDica.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

type ToastType = "success" | "error"

export default function EditarDica() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
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

  // 🔥 CARREGAR DADOS
  useEffect(() => {
    if (!id) return

    getDicaById(id).then((data) => {
      setTitulo(data.titulo || "")
      setCategoria(data.categoria || "")
      setConteudo(data.conteudo || "")
      setImagemAtual(data.imagem || "")
    })
  }, [id])

  // 🔥 SALVAR
  const handleSubmit = async () => {
    try {
      if (!titulo.trim() || !conteudo.trim() || conteudo === "<p></p>") {
        showToast("error", "Preencha título e conteúdo.")
        return
      }

      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await updateDica(id!, {
        titulo,
        conteudo,
        imagem: imageUrl,
        categoria,
        autor: "Admin"
      })

      showToast("success", "Dica atualizada com sucesso!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar dica.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>

      <main className="novaNoticia">

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

        {/* VOLTAR */}
        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Editar dica</h1>

        <div className="form">

          <input
            type="text"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="formRow">

            <select
              className="selectInput"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Categoria</option>
              <option>Pilotagem</option>
              <option>Manutenção</option>
              <option>Segurança</option>
            </select>

            <label className="uploadBox">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0])
                  }
                }}
              />
              <span>
                {file ? file.name : "Alterar imagem"}
              </span>
            </label>

          </div>

          {/* PREVIEW */}
          {(imagemAtual || file) && (
  <div className="novaNoticia__preview">
    <img
      src={file ? URL.createObjectURL(file) : imagemAtual}
      alt="preview"
    />
  </div>
)}
          <RichTextEditor content={conteudo} onChange={setConteudo} />

          <button className="publishBtn" onClick={handleSubmit}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}