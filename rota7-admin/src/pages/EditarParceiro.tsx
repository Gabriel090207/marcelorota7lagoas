import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AdminLayout from "../components/admin/AdminLayout"
import "./NovoParceiro.css"

import { getParceiros, updateParceiro } from "../services/api"

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
  const [whatsapp, setWhatsapp] = useState("")
  const [descricao, setDescricao] = useState("")
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

  // 🔥 MÁSCARA TELEFONE
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
        setWhatsapp(parceiro.whatsapp || "")
        setDescricao(parceiro.descricao || "")
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

      await updateParceiro(id, {
        nome,
        categoria,
        telefone,
        whatsapp,
        descricao
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

        {/* 🔥 TOAST */}
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

          {/* WHATSAPP */}
          <div className="formRow">

            <div className="field">
              <label>WhatsApp</label>

              <input
                type="text"
                placeholder="(31) 99999-9999"
                className="input"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
              />
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
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}