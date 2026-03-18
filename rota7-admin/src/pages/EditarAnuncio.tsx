import AdminLayout from "../components/admin/AdminLayout"
import { getAnuncioById, updateAnuncio } from "../services/api"
import { uploadImage } from "../services/storage"
import "./NovoAnuncio.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

type ToastType = "success" | "error"

const formatPrice = (value: string) => {
  value = value.replace(/\D/g, "")
  value = (Number(value) / 100).toFixed(2) + ""
  value = value.replace(".", ",")
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return "R$ " + value
}

export default function EditarAnuncio() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [tipo, setTipo] = useState("")
  const [preco, setPreco] = useState("")
  const [telefone, setTelefone] = useState("")
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

  // 🔥 carregar dados
  useEffect(() => {
    if (!id) return

    getAnuncioById(id).then((data) => {
      setTitulo(data.titulo || "")
      setTipo(data.tipo || "")
      setPreco(data.preco || "")
      setTelefone(data.telefone || "")
      setDescricao(data.descricao || "")
      setImagemAtual(data.imagem || "")
    })
  }, [id])

  // 🔥 salvar
  const handleSubmit = async () => {
    try {

      if (!titulo || !preco) {
        showToast("error", "Preencha título e preço")
        return
      }

      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await updateAnuncio(id!, {
        titulo,
        tipo,
        preco,
        telefone,
        descricao,
        imagem: imageUrl
      })

      showToast("success", "Anúncio atualizado!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar anúncio")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <main className="novoGrupo">

        {/* VOLTAR */}
        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Editar anúncio</h1>

        <div className="form">

          <input
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <select
            className="selectInput"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Categoria</option>
            <option>Moto</option>
            <option>Peças</option>
            <option>Equipamento</option>
          </select>

          <input
            className="input"
            value={preco}
            onChange={(e) => setPreco(formatPrice(e.target.value))}
          />

          <input
            className="input"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <textarea
            className="input"
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