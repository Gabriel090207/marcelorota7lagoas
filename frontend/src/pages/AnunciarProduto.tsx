import "./AnunciarProduto.css"

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

const formatPhone = (value: string) => {
  value = value.replace(/\D/g, "")

  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  }

  return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
}

export default function AnunciarProduto() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("")
  const [preco, setPreco] = useState("")
  const [telefone, setTelefone] = useState("")
  const [descricao, setDescricao] = useState("")
  const [km, setKm] = useState("")

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

      if (!titulo || !preco) {
        showToast("error", "Preencha título e preço")
        return
      }

      setLoading(true)

      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo: "produto",
          titulo,
          categoria,
          preco,
          telefone,
          descricao,
          km
        })
      })

      showToast("success", "Produto enviado para análise!")

      setTitulo("")
      setCategoria("")
      setPreco("")
      setTelefone("")
      setDescricao("")
      setKm("")

    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao enviar produto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="anunciarProduto">

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

        <button className="adminToast__close" onClick={() => setToastOpen(false)}>
          <FiX size={18} />
        </button>
      </div>

      {/* VOLTAR */}
      <div
        className="novaNoticia__back"
        onClick={() => navigate("/classificados")}
      >
        <FiArrowLeft size={18} />
        <span>Voltar</span>
      </div>

      <div className="anunciarProduto__header">
        <h1>Anunciar produto</h1>
      </div>

      <div className="form">

        <input
          className="input"
          placeholder="Título do produto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className="formRow">

          <select
            className="selectInput"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione</option>
            <option>Moto</option>
            <option>Equipamento</option>
            <option>Peças</option>
          </select>

          <input
            className="input"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(formatPrice(e.target.value))}
          />

        </div>

        {categoria === "Moto" && (
          <input
            className="input"
            placeholder="KM rodados"
            value={km}
            onChange={(e) => setKm(e.target.value)}
          />
        )}

        <input
          className="input"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
        />

        <textarea
          className="textarea"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button className="publishBtn" onClick={handleSubmit}>
          {loading ? "Enviando..." : "Enviar produto"}
        </button>

      </div>
    </main>
  )
}