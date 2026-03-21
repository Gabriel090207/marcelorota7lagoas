import AdminLayout from "../components/admin/AdminLayout"
import "./SolicitacaoEvento.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  FiArrowLeft,
  FiCheck,
  FiTrash
} from "react-icons/fi"

import { createEvento } from "../services/api"

export default function SolicitacaoEvento() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // 🔥 buscar solicitação
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`)
      .then(res => res.json())
      .then(setData)
  }, [id])

  // 🔥 APROVAR
  const handleAprovar = async () => {
    try {
      setLoading(true)

      await createEvento({
        titulo: data.titulo,
        data: data.data,
        local: data.local,
        descricao: data.descricao,
        imagem: data.imagem
      })

      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
        method: "DELETE"
      })

      navigate("/eventos")

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 RECUSAR
  const handleRecusar = async () => {
    if (!confirm("Deseja realmente excluir esta solicitação?")) return

    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
      method: "DELETE"
    })

    navigate("/eventos")
  }

  if (!data) return null

  return (
    <AdminLayout>

      <main className="adminPage">

        {/* VOLTAR */}
        <div className="backBtn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Solicitação de evento</h1>

        <div className="solicitacaoBox">

          <h2>{data.titulo}</h2>

          <p><strong>Data:</strong> {data.data}</p>
          <p><strong>Local:</strong> {data.local}</p>
          <p><strong>Responsável:</strong> {data.responsavel}</p>
          <p><strong>Contato:</strong> {data.contato}</p>

          {data.imagem && (
            <img src={data.imagem} className="solicitacaoImagem" />
          )}

          <p className="descricao">{data.descricao}</p>

        </div>

        {/* AÇÕES */}
        <div className="actions">

          <button
            className="btn btn--primary"
            onClick={handleAprovar}
            disabled={loading}
          >
            <FiCheck />
            Aprovar evento
          </button>

          <button
            className="btn btn--danger"
            onClick={handleRecusar}
          >
            <FiTrash />
            Recusar
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}