import "./AnunciarEmpresa.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiX
} from "react-icons/fi"

import { uploadImage } from "../services/storage"

type ToastType = "success" | "error"

// 📞 máscara telefone
const formatPhone = (value: string) => {
  value = value.replace(/\D/g, "")

  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  }

  return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
}

export default function AnunciarEmpresa() {

  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
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

    setTimeout(() => {
      setToastOpen(false)
    }, 3000)
  }

  const handleSubmit = async () => {
    try {

      if (!nome || !email) {
        showToast("error", "Preencha nome e email")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo: "empresa",
          nome,
          categoria,
          telefone,
          email,
          descricao,
          imagem: imageUrl
        })
      })

      showToast("success", "Solicitação enviada com sucesso!")

      // limpar
      setNome("")
      setCategoria("")
      setTelefone("")
      setEmail("")
      setDescricao("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao enviar solicitação")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="anunciarEmpresa">

      {/* TOAST */}
      <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>
        <div className="adminToast__icon">
          {toastType === "success"
            ? <FiCheckCircle size={18} />
            : <FiAlertCircle size={18} />
          }
        </div>

        <div className="adminToast__content">
          <strong>{toastType === "success" ? "Sucesso" : "Atenção"}</strong>
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
            navigate("/classificados")
          }
        }}
      >
        <FiArrowLeft size={18} />
        <span>Voltar</span>
      </div>

      {/* HEADER */}
      <div className="anunciarEmpresa__header">
        <h1>Cadastrar empresa</h1>
        <p>Preencha os dados para aparecer como parceiro no portal</p>
      </div>

      {/* FORM */}
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

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* IMAGEM */}
        <div className="field">
          <label>Imagem</label>

          <label className="uploadBox">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
            <span>{file ? file.name : "Selecionar imagem"}</span>
          </label>
        </div>

        {/* DESCRIÇÃO */}
        <div className="field">
          <label>Descrição</label>

          <textarea
            className="textarea"
            placeholder="Descreva sua empresa..."
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
          {loading ? "Enviando..." : "Enviar solicitação"}
        </button>

      </div>

    </main>
  )
}