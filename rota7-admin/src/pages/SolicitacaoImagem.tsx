import AdminLayout from "../components/admin/AdminLayout"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { createImagem } from "../services/api"

import {
  FiArrowLeft,
  FiCheck,
  FiX
} from "react-icons/fi"

export default function SolicitacaoImagem() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`)
      .then(res => res.json())
      .then(setData)
  }, [id])

  const handleAprovar = async () => {
    try {

      await createImagem({
        titulo: data.titulo,
        categoria: data.categoria,
        url: data.imagem
      })

      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
        method: "DELETE"
      })

      navigate("/galeria")

    } catch (error) {
      console.error(error)
    }
  }

  const handleRecusar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
      method: "DELETE"
    })

    navigate("/galeria")
  }

  if (!data) return null

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Solicitação de Imagem</h1>

        <div className="form">

          <input className="input" value={data.titulo} disabled />
          <input className="input" value={data.categoria} disabled />

          {data.imagem && (
            <img src={data.imagem} style={{ width: "100%", borderRadius: 10 }} />
          )}

          <div style={{ display: "flex", gap: 10 }}>

            <button className="btn btn--primary" onClick={handleAprovar}>
              <FiCheck />
              Aprovar
            </button>

            <button className="btn btn--outline" onClick={handleRecusar}>
              <FiX />
              Recusar
            </button>

          </div>

        </div>

      </main>

    </AdminLayout>
  )
}