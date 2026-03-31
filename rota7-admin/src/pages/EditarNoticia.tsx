import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import { getNoticiaById, updateNoticia } from "../services/api"
import "./NovaNoticia.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

import { categorias } from "../constants/categorias"

type ToastType = "success" | "error"

export default function EditarNoticia() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [imagensExtras, setImagensExtras] = useState<File[]>([])
const [previewExtras, setPreviewExtras] = useState<string[]>([])
const [imagensAtuais, setImagensAtuais] = useState<string[]>([])
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [imagemAtual, setImagemAtual] = useState("")
  const [previewImagem, setPreviewImagem] = useState("")
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
    }, 3200)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        const data = await getNoticiaById(id)

        setTitulo(data.titulo || "")
        setCategoria(data.categoria || "")
        setConteudo(data.conteudo || "")
        setImagemAtual(data.imagem || "")
        setPreviewImagem(data.imagem || "")
        setImagensAtuais(data.imagens || [])
setPreviewExtras(data.imagens || [])
      } catch (error) {
        console.error(error)
        showToast("error", "Erro ao carregar notícia.")
      }
    }

    fetchData()
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewImagem(URL.createObjectURL(selectedFile))
    }
  }

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return

  const filesArray = Array.from(e.target.files)
  const previews = filesArray.map(file => URL.createObjectURL(file))

  setImagensExtras(prev => [...prev, ...filesArray])
  setPreviewExtras(prev => [...prev, ...previews])
}

const handleRemoveImage = (index: number) => {
  setPreviewExtras(prev => prev.filter((_, i) => i !== index))
  setImagensExtras(prev => prev.filter((_, i) => i !== index))
  setImagensAtuais(prev => prev.filter((_, i) => i !== index))
}

  const handleSubmit = async () => {
    try {
      if (!titulo.trim() || !conteudo.trim() || conteudo === "<p></p>") {
        showToast("error", "Preencha título e conteúdo.")
        return
      }

      if (!id) return

      setLoading(true)

      let imageUrl = imagemAtual

      let imagensUrls = imagensAtuais

if (imagensExtras.length > 0) {
  const novas = await Promise.all(
    imagensExtras.map(img => uploadImage(img))
  )

  imagensUrls = [...imagensAtuais, ...novas]
}

      if (file) {
        imageUrl = await uploadImage(file)
      }

     await updateNoticia(id, {
  titulo,
  conteudo,
  categoria,
  imagem: imageUrl,
  imagens: imagensUrls,
  autor: "Admin"
})
      // 🔥 mantém na página
      setImagemAtual(imageUrl)
      setPreviewImagem(imageUrl)
      setFile(null)

      showToast("success", "Notícia atualizada com sucesso!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar notícia.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novaNoticia">

        {/* 🔥 TOAST PADRÃO */}
        <div
          className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}
        >
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

        {/* VOLTAR */}
        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        {/* HEADER */}
        <div className="novaNoticia__header">
          <h1>Editar notícia</h1>
        </div>

        {/* FORM */}
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
                <input type="file" onChange={handleFileChange} />
                <span>{file ? file.name : "Alterar imagem"}</span>
              </label>
            </div>

          </div>

          {previewImagem && (
            <div className="novaNoticia__preview">
              <img src={previewImagem} alt="Preview da capa" />
            </div>
          )}

          <RichTextEditor
            content={conteudo}
            onChange={setConteudo}
          />

          <div className="field">
  <label>Imagens da notícia</label>

  <label className="uploadBox">
    <input
      type="file"
      multiple
      onChange={handleMultipleImages}
    />
    <span>
      {previewExtras.length > 0
        ? `${previewExtras.length} imagens`
        : "Selecionar imagens"}
    </span>
  </label>
</div>

{previewExtras.length > 0 && (
  <div className="galleryPreview">
    {previewExtras.map((img, index) => (
  <div key={index} className="previewItem">

    <img src={img} />

    <button
      className="removeImageBtn"
      onClick={() => handleRemoveImage(index)}
      type="button"
    >
      <FiX size={14} />
    </button>

  </div>
))}
  </div>
)}

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