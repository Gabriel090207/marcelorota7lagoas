import AdminLayout from "../components/admin/AdminLayout"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { createGrupo } from "../services/api"

import {
  FiArrowLeft,
  FiCheck,
  FiX
} from "react-icons/fi"

export default function SolicitacaoGrupo() {

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

      await createGrupo({
        nome: data.nome,
        tipo: data.tipoGrupo,
        link: data.link,
        imagem: data.imagem,
        descricao: data.descricao
      })

      // remove da fila
      await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
        method: "DELETE"
      })

      navigate("/grupos")

    } catch (error) {
      console.error(error)
    }
  }

  const handleRecusar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
      method: "DELETE"
    })

    navigate("/grupos")
  }

  if (!data) return null

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Solicitação de Grupo</h1>

        <div className="form">

          <input className="input" value={data.nome} disabled />
          <input className="input" value={data.tipoGrupo} disabled />
          <input className="input" value={data.link} disabled />
          <input className="input" value={data.responsavel} disabled />
          <input className="input" value={data.telefone} disabled />

          <textarea className="input" value={data.descricao} disabled />

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