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

// 💰 máscara de preço
const formatPrice = (value: string) => {
  value = value.replace(/\D/g, "")
  value = (Number(value) / 100).toFixed(2) + ""
  value = value.replace(".", ",")
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return "R$ " + value
}

// 📞 máscara telefone
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
  const [file, setFile] = useState<File | null>(null)
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

      console.log({
        titulo,
        categoria,
        preco,
        telefone,
        descricao,
        km,
        file
      })

      showToast("success", "Produto enviado para análise!")

      // limpar
      setTitulo("")
      setCategoria("")
      setPreco("")
      setTelefone("")
      setDescricao("")
      setFile(null)
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
      <div className="anunciarProduto__header">
        <h1>Anunciar produto</h1>
        <p>Venda motos, peças e equipamentos na comunidade</p>
      </div>

      {/* FORM */}
      <div className="form">

        {/* TITULO */}
        <input
          type="text"
          placeholder="Título do produto"
          className="input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        {/* CATEGORIA + PREÇO */}
        <div className="formRow">

          <div className="field">
            <label>Categoria</label>

            <select
              className="selectInput"
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value)
                setKm("")
              }}
            >
              <option value="">Selecione</option>
              <option>Moto</option>
              <option>Equipamento</option>
              <option>Peças</option>
              <option>Acessórios</option>
            </select>
          </div>

          <div className="field">
            <label>Preço</label>

            <input
              type="text"
              placeholder="R$ 0,00"
              className="input"
              value={preco}
              onChange={(e) => setPreco(formatPrice(e.target.value))}
            />
          </div>

        </div>

        {/* KM (SÓ MOTO) */}
        {categoria === "Moto" && (
          <div className="field">
            <label>KM rodados</label>

            <input
              type="text"
              placeholder="Ex: 18.000 km"
              className="input"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
          </div>
        )}

        {/* TELEFONE */}
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
            placeholder="Descreva o produto..."
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
          {loading ? "Enviando..." : "Enviar produto"}
        </button>

      </div>

    </main>
  )
}