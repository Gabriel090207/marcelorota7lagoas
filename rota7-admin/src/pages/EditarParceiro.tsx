import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AdminLayout from "../components/admin/AdminLayout"
import "./NovoParceiro.css"

import { getParceiros, updateParceiro } from "../services/api"

export default function EditarParceiro() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [descricao, setDescricao] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔥 carregar dados do parceiro
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

  // 🔥 salvar edição
  const handleSubmit = async () => {
    if (!id) return

    try {
      setLoading(true)

      await updateParceiro(id, {
        nome,
        categoria,
        telefone,
        whatsapp,
        descricao
      })

      alert("Parceiro atualizado com sucesso!")
      navigate("/parceiros")

    } catch (error) {
      console.error(error)
      alert("Erro ao atualizar parceiro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>

      <main className="novoParceiro">

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
                onChange={(e) => setTelefone(e.target.value)}
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
                onChange={(e) => setWhatsapp(e.target.value)}
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