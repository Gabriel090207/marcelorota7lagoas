import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../components/admin/AdminLayout"
import "./SolicitacaoParceiro.css"

import { FiArrowLeft } from "react-icons/fi"

export default function SolicitacaoAnuncio() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err))
  }, [id])

  if (!data) {
    return (
      <AdminLayout>
        <main className="solicitacaoPage">
          <p>Carregando...</p>
        </main>
      </AdminLayout>
    )
  }

  const aprovar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/aprovar/${id}`, {
      method: "POST"
    })

    navigate("/anuncios")
  }

  const rejeitar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
      method: "DELETE"
    })

    navigate("/anuncios")
  }

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

        {/* 🔙 VOLTAR */}
        <div
          className="adminBack"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft size={18} />
          <span>Voltar</span>
        </div>

        <h1>Solicitação de Produto</h1>

        <div className="card">

          <div className="field">
            <span>Título</span>
            <strong>{data.titulo}</strong>
          </div>

          <div className="field">
            <span>Categoria</span>
            <strong>{data.categoria}</strong>
          </div>

          <div className="field">
            <span>Preço</span>
            <strong>{data.preco}</strong>
          </div>

          {data.km && (
            <div className="field">
              <span>KM</span>
              <strong>{data.km}</strong>
            </div>
          )}

          <div className="field">
            <span>Telefone</span>
            <strong>{data.telefone}</strong>
          </div>

          <div className="field">
            <span>Descrição</span>
            <p>{data.descricao}</p>
          </div>

          {data.imagem && (
            <div className="preview">
              <img src={data.imagem} alt="produto" />
            </div>
          )}

        </div>

        <div className="actions">

          <button className="btn approve" onClick={aprovar}>
            Aprovar
          </button>

          <button className="btn reject" onClick={rejeitar}>
            Rejeitar
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}