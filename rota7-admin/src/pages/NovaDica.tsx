import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import { createDica } from "../services/api"
import "./NovaDica.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

export default function NovaDica() {

  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [loading, setLoading] = useState(false)

  type ToastType = "success" | "error"

const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<ToastType>("success")
const [toastMessage, setToastMessage] = useState("")

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

      await createDica({
        titulo,
        conteudo,
        imagem: imageUrl,
        categoria,
        autor: "Admin"
      })

      showToast("success", "Dica publicada com sucesso!")


      

      setTitulo("")
      setCategoria("")
   setConteudo("")
      setFile(null)

    } catch (error) {
  console.error(error)
  showToast("error", "Erro ao publicar dica.")
}finally {
      setLoading(false)
    }
  }

  const showToast = (type: ToastType, message: string) => {
  setToastType(type)
  setToastMessage(message)
  setToastOpen(true)

  setTimeout(() => {
    setToastOpen(false)
  }, 3000)
} 

  return (
    <AdminLayout>

      <main className="novaNoticia">

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Nova dica</h1>

        <div className="form">

          <input
            type="text"
            placeholder="Título da dica"
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
              <span>{file ? file.name : "Selecionar imagem"}</span>
            </label>

          </div>

          <RichTextEditor
  key={conteudo === "" ? "empty" : "filled"}
  content={conteudo}
  onChange={setConteudo}
/>

          <button className="publishBtn" onClick={handleSubmit}>
            {loading ? "Publicando..." : "Publicar dica"}
          </button>

        </div>

<div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

  <div className="adminToast__icon">
    {toastType === "success" ? (
      <FiCheckCircle size={18} />
    ) : (
      <FiAlertCircle size={18} />
    )}
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

      </main>

    </AdminLayout>
  )
}