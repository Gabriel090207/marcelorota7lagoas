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

const [legendaCapa, setLegendaCapa] = useState("")
const [legendasExtras, setLegendasExtras] = useState<string[]>([])
const [videoLink, setVideoLink] = useState("")
const [videoFiles, setVideoFiles] = useState<File[]>([])
const [videosAtuais, setVideosAtuais] = useState<string[]>([])
const [legendasVideos, setLegendasVideos] = useState<string[]>([])
const [legendaVideo, setLegendaVideo] = useState("")

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
setLegendaCapa(data.legendaCapa || "")
setLegendasExtras(data.legendas || [])
setVideoLink(data.videoLink || "")
setVideosAtuais(
  data.videoArquivo
    ? Array.isArray(data.videoArquivo)
      ? data.videoArquivo
      : [data.videoArquivo]
    : []
)
setLegendaVideo(data.legendaVideo || "")
setLegendasVideos(data.legendasVideos || [])
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
  setLegendasExtras(prev => [
  ...prev,
  ...filesArray.map(() => "")
])
}

const handleRemoveImage = (index: number) => {
  setPreviewExtras(prev => prev.filter((_, i) => i !== index))
  setImagensExtras(prev => prev.filter((_, i) => i !== index))
  setImagensAtuais(prev => prev.filter((_, i) => i !== index))

  setLegendasExtras(prev => prev.filter((_, i) => i !== index))
}

const handleRemoveVideoAtual = (index: number) => {
  setVideosAtuais(prev => prev.filter((_, i) => i !== index))
  setLegendasVideos(prev => prev.filter((_, i) => i !== index))
}

const handleRemoveVideoNovo = (index: number) => {
  setVideoFiles(prev => prev.filter((_, i) => i !== index))
  setLegendasVideos(prev => prev.filter((_, i) => i !== index))
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
  legendaCapa,
  imagens: imagensUrls,
  legendas: legendasExtras,
  videoLink,
videoArquivo: [...videosAtuais],
legendaVideo,
legendasVideos,
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

              <input
  type="text"
  placeholder="Legenda da imagem de capa"
  className="input"
  value={legendaCapa}
  onChange={(e) => setLegendaCapa(e.target.value)}
/>


 {previewImagem && (
            <div className="novaNoticia__preview">
              <img src={previewImagem} alt="Preview da capa" />
            </div>
          )}

            </div>

          </div>

       

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

  <input
    type="text"
    placeholder="Legenda da imagem"
    className="input"
    value={legendasExtras[index] || ""}
    onChange={(e) => {
      const novas = [...legendasExtras]
      novas[index] = e.target.value
      setLegendasExtras(novas)
    }}
  />

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


<div className="field">
  <label>Vídeos da matéria</label>

  <input
    type="text"
    placeholder="Cole o link do vídeo"
    className="input"
    value={videoLink}
    onChange={(e) => setVideoLink(e.target.value)}
  />

  <input
  type="text"
  placeholder="Legenda do vídeo"
  className="input"
  value={legendaVideo}
  onChange={(e) => setLegendaVideo(e.target.value)}
/>

  <label className="uploadBox">
    <input
      type="file"
      accept="video/*"
      multiple
      onChange={(e) => {
        if (!e.target.files) return
        const arquivos = Array.from(e.target.files)
        setVideoFiles(prev => [...prev, ...arquivos])

setLegendasVideos(prev => [
  ...prev,
  ...arquivos.map(() => "")
])
      }}
    />
    <span>
      {videoFiles.length > 0
        ? `${videoFiles.length} vídeos selecionados`
        : "Selecionar vídeos"}
    </span>
  </label>
</div>

{videosAtuais.length > 0 && (
  <div className="videoList">
    {videosAtuais.map((video, index) => (
      <div key={index} className="previewItem">
      <div className="fileCard">
  {decodeURIComponent(
    video
      .split("%2F")
      .pop()
      ?.split("?")[0]
      ?.replace(/^\d+-/, "")
      ?.replace(/_/g, " ")
      ?.trim() || `Vídeo ${index + 1}`
  )}
</div>

<input
  type="text"
  placeholder="Legenda do vídeo"
  className="input"
  value={legendasVideos[index] || ""}
  onChange={(e) => {
    const novas = [...legendasVideos]
    novas[index] = e.target.value
    setLegendasVideos(novas)
  }}
/>
        <button
          className="removeImageBtn"
          type="button"
          onClick={() => handleRemoveVideoAtual(index)}
        >
          <FiX size={14} />
        </button>
      </div>
    ))}
  </div>
)}

{videoFiles.length > 0 && (
  <div className="videoList">
    {videoFiles.map((file, index) => (
      <div key={index} className="previewItem">
        <div className="fileCard">
          {file.name}
        </div>

        <button
          className="removeImageBtn"
          type="button"
          onClick={() => handleRemoveVideoNovo(index)}
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