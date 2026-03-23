import AdminLayout from "../components/admin/AdminLayout"
import "./SolicitacaoEvento.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  FiArrowLeft,

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
  imagem: data.imagem,
  tag: data.tag
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
  await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
    method: "DELETE"
  })

  navigate("/eventos")
}

  if (!data) return null

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

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
          <p><strong>Tag:</strong> {data.tag || "Não informada"}</p>
          <p><strong>Responsável:</strong> {data.responsavel}</p>
          <p><strong>Contato:</strong> {data.contato}</p>

         {data.imagem && (
  <div className="preview">
    <img src={data.imagem} className="solicitacaoImagem" />
  </div>
)}

          <p className="descricao">{data.descricao}</p>

        </div>

        {/* AÇÕES */}
        <div className="actions">

          <button
            className="btn approve"
            onClick={handleAprovar}
            disabled={loading}
          >
           
            Aprovar 
          </button>

          <button
            className="btn reject"
            onClick={handleRecusar}
          >
            
            Rejeitar
          </button>


        </div>

      </main>

    </AdminLayout>
  )
}