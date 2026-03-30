import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import { getBlogById, updateBlog } from "../services/api"
import "./NovoBlog.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

type ToastType = "success" | "error"

const categoriasBlog = [
  "Experiências",
  "Viagens",
  "Eventos",
  "Opiniões"
]

export default function EditarBlog() {
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
        const data = await getBlogById(id)

        setTitulo(data.titulo || "")
        setCategoria(data.categoria || "")
        setConteudo(data.conteudo || "")
        setImagemAtual(data.imagem || "")
        setPreviewImagem(data.imagem || "")
        setImagensAtuais(data.imagens || [])
setPreviewExtras(data.imagens || [])
      } catch (error) {
        console.error(error)
        showToast("error", "Erro ao carregar blog.")
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

  const handleSubmit = async () => {
    try {
      if (!titulo.trim() || !conteudo.trim() || conteudo === "<p></p>") {
        showToast("error", "Preencha título e conteúdo.")
        return
      }

      if (!id) return

      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

    let imagensUrls = imagensAtuais

if (imagensExtras.length > 0) {
  const novas = await Promise.all(
    imagensExtras.map(img => uploadImage(img))
  )

  imagensUrls = [...imagensAtuais, ...novas]
}

await updateBlog(id, {
  titulo,
  conteudo,
  categoria,
  imagem: imageUrl,
  imagens: imagensUrls,
  autor: "Marcelão"
})
      setImagemAtual(imageUrl)
setPreviewImagem(imageUrl)
setFile(null)

      showToast("success", "Blog atualizado com sucesso!")

    
    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar blog.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novoBlog">

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

        <div className="novoBlog__back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novoBlog__header">
          <h1>Editar blog</h1>
        </div>

        <div className="novoBlog__form">

          <input
            type="text"
            placeholder="Título do blog"
            className="novoBlog__input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="novoBlog__row">

            <div className="novoBlog__field">
              <label>Categoria</label>

              <select
                className="novoBlog__select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione</option>

                {categoriasBlog.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="novoBlog__field">
              <label>Imagem de capa</label>

              <label className="novoBlog__upload">
                <input type="file" onChange={handleFileChange} />
                <span>{file ? file.name : "Alterar imagem"}</span>
              </label>
            </div>

          </div>

          {previewImagem && (
            <div className="novoBlog__preview">
              <img src={previewImagem} alt="Preview da capa" />
            </div>
          )}

          <RichTextEditor
  content={conteudo}
  onChange={setConteudo}
/>

<div className="novoBlog__field">
  <label>Imagens do blog</label>

  <label className="novoBlog__upload">
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
  <div className="novoBlog__galleryPreview">
    {previewExtras.map((img, index) => (
      <img key={index} src={img} />
    ))}
  </div>
)}

          <button
            className="novoBlog__button"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

        </div>

      </main>
    </AdminLayout>
  )
}