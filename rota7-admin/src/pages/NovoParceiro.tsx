import { useState } from "react"
import AdminLayout from "../components/admin/AdminLayout"
import "./NovoParceiro.css"

import { useNavigate } from "react-router-dom"
import { createParceiro } from "../services/api"
import { uploadImage } from "../services/storage"

import { FiCheckCircle, FiAlertCircle, FiX, FiArrowLeft } from "react-icons/fi"

type ToastType = "success" | "error"

const formatPhone = (value: string) => {
  value = value.replace(/\D/g, "")
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")
  return value.slice(0, 15)
}

export default function NovoParceiro() {

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

      if (!nome.trim()) {
        showToast("error", "Preencha o nome do parceiro")
        return
      }

      if (!email.trim()) {
        showToast("error", "Preencha o email")
        return
      }

      setLoading(true)

      let imageUrl = ""

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await createParceiro({
        nome,
        categoria,
        telefone,
        email,
        descricao,
        imagem: imageUrl
      })

      showToast("success", "Parceiro criado com sucesso!")

      // limpa formulário (igual notícia)
      setNome("")
      setCategoria("")
      setTelefone("")
      setEmail("")
      setDescricao("")
      setFile(null)

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao criar parceiro")
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

        {/* 🔙 VOLTAR */}
        <div
          className="novaNoticia__back"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <div className="novoParceiro__header">
          <h1>Novo parceiro</h1>
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
                    if (e.target.files && e.target.files[0]) {
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