import "./AnunciarEmpresa.css"

import { useState } from "react"
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

type ToastType = "success" | "error"

export default function AnunciarEmpresa() {

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [descricao, setDescricao] = useState("")

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

      // 🔥 aqui depois vamos mandar pro backend
      console.log({
        nome,
        categoria,
        telefone,
        email,
        descricao
      })

      showToast("success", "Solicitação enviada com sucesso!")

      setNome("")
      setCategoria("")
      setTelefone("")
      setEmail("")
      setDescricao("")

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
        onClick={() => window.history.back()}
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

        <input
          type="text"
          placeholder="Nome da empresa"
          className="input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

        </div>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="field">
          <label>Descrição</label>

          <textarea
            className="textarea"
            placeholder="Descreva sua empresa..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

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