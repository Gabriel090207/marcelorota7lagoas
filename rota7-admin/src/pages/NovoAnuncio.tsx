import AdminLayout from "../components/admin/AdminLayout"
import { createAnuncio } from "../services/api"
import { uploadImage } from "../services/storage"
import "./NovoAnuncio.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

export default function NovoAnuncio() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [tipo, setTipo] = useState("")
  const [preco, setPreco] = useState("")
  const [telefone, setTelefone] = useState("")
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

      if (!titulo || !preco) {
        showToast("error", "Preencha título e preço")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await createAnuncio({
        titulo,
        tipo,
        preco,
        telefone,
        descricao,
        imagem: imageUrl
      })

      showToast("success", "Anúncio criado!")

      setTitulo("")
      setTipo("")
      setPreco("")
      setTelefone("")
      setDescricao("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao criar anúncio")
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

        <h1>Novo anúncio</h1>

        <div className="form">

          <input
            className="input"
            placeholder="Título"
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
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(formatPrice(e.target.value))}
          />

          <input
            className="input"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          {/* IMAGEM */}
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

          {file && (
            <div className="novaNoticia__preview">
              <img src={URL.createObjectURL(file)} />
            </div>
          )}

          <button className="publishBtn" onClick={handleSubmit}>
            {loading ? "Salvando..." : "Criar anúncio"}
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