import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import { uploadImage } from "../services/storage"
import { getNoticiaById, updateNoticia } from "../services/api"
import "./NovaNoticia.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import { categorias } from "../constants/categorias"

export default function EditarNoticia() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [imagemAtual, setImagemAtual] = useState("")
  const [previewImagem, setPreviewImagem] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      const data = await getNoticiaById(id)

      setTitulo(data.titulo || "")
      setCategoria(data.categoria || "")
      setConteudo(data.conteudo || "")
      setImagemAtual(data.imagem || "")
      setPreviewImagem(data.imagem || "")
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

  const handleSubmit = async () => {
    try {
      if (!titulo || !conteudo) {
        alert("Preencha título e conteúdo")
        return
      }

      if (!id) return

      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await updateNoticia(id, {
        titulo,
        conteudo,
        categoria,
        imagem: imageUrl,
        autor: "Admin"
      })

      alert("Notícia atualizada com sucesso!")
      navigate("/noticias")
    } catch (error) {
      console.error(error)
      alert("Erro ao atualizar notícia")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novaNoticia">
        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novaNoticia__header">
          <h1>Editar notícia</h1>
        </div>

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