import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AdminLayout from "../components/admin/AdminLayout"
import "./NovoParceiro.css"

import { getParceiros, updateParceiro } from "../services/api"
import { uploadImage } from "../services/storage"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

export default function EditarParceiro() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [descricao, setDescricao] = useState("")

  const [file, setFile] = useState<File | null>(null)
  const [imagemAtual, setImagemAtual] = useState("")

  const [loading, setLoading] = useState(false)

  // 🔥 TOAST
  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type)
    setToastMessage(message)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 3000)
  }

  // 🔥 máscara telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
    }

    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }

  // 🔥 carregar dados
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      const lista = await getParceiros()
      const parceiro = lista.find((p: any) => p.id === id)

      if (parceiro) {
        setNome(parceiro.nome || "")
        setCategoria(parceiro.categoria || "")
        setTelefone(parceiro.telefone || "")
        setEmail(parceiro.email || "")
        setDescricao(parceiro.descricao || "")
        setImagemAtual(parceiro.imagem || "")
      }
    }

    fetchData()
  }, [id])

  // 🔥 salvar
  const handleSubmit = async () => {
    if (!id) return

    if (!nome || !categoria) {
      showToast("error", "Preencha os campos obrigatórios")
      return
    }

    try {
      setLoading(true)

      let imageUrl = imagemAtual

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await updateParceiro(id, {
        nome,
        categoria,
        telefone,
        email,
        descricao,
        imagem: imageUrl
      })

      showToast("success", "Parceiro atualizado com sucesso!")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao atualizar parceiro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>

      <main className="novoParceiro">

        {/* TOAST */}
        <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

          <div className="adminToast__icon">
            {toastType === "success"
              ? <FiCheckCircle size={18} />
              : <FiAlertCircle size={18} />}
          </div>

          <div className="adminToast__content">
            <strong>
              {toastType === "success" ? "Sucesso" : "Erro"}
            </strong>
            <span>{toastMessage}</span>
          </div>

          <button
            className="adminToast__close"
            onClick={() => setToastOpen(false)}
          >
            <FiX size={18} />
          </button>

        </div>

        {/* VOLTAR */}
        <div
          className="novaNoticia__back"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1)
            } else {
              navigate("/parceiros")
            }
          }}
        >
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novoParceiro__header">
          <h1>Editar parceiro</h1>
        </div>

       <div className="form">

  {/* NOME */}
  <input
    type="text"
    placeholder="Nome da empresa"
    className="input"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
  />

  {/* CATEGORIA + TELEFONE */}
  <div className="formRow">

    <div className="field">
      <label>Categoria</label>

      <select
        className="selectInput"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Selecione</option>
        <option>Oficina</option>
        <option>Serviços</option>
        <option>Equipamentos</option>
        <option>Peças</option>
        <option>Concessionária</option>
        <option>Restaurante</option>
        <option>Hotel / Pousada</option>
      </select>
    </div>

    <div className="field">
      <label>Telefone</label>

      <input
        type="text"
        placeholder="(31) 99999-9999"
        className="input"
        value={telefone}
        onChange={(e) => setTelefone(formatPhone(e.target.value))}
      />
    </div>

  </div>

  {/* EMAIL + IMAGEM */}
  <div className="formRow">

    <div className="field">
      <label>Email</label>

      <input
        type="email"
        placeholder="contato@empresa.com"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="field">
      <label>Imagem</label>

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
          {file ? file.name : "Selecionar imagem"}
        </span>
      </label>

    </div>

  </div>

  {/* PREVIEW */}
  {(file || imagemAtual) && (
    <div className="novaNoticia__preview">
      <img src={file ? URL.createObjectURL(file) : imagemAtual} />
    </div>
  )}

  {/* DESCRIÇÃO */}
  <div className="field">
    <label>Descrição</label>

    <textarea
      className="textarea"
      placeholder="Descreva o parceiro..."
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
    />
  </div>

  {/* BOTÃO */}
  <button
    className="publishBtn"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? "Salvando..." : "Salvar parceiro"}
  </button>

</div>

      </main>

    </AdminLayout>
  )
}