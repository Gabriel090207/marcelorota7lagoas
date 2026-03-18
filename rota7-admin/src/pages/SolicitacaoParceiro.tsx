import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../components/admin/AdminLayout"
import "./SolicitacaoParceiro.css"

export default function SolicitacaoParceiro() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(lista => {
       const found = lista.find((i: any) => String(i.id) === String(id))
        setData(found)
      })
  }, [id])

  if (!data) return <p>Carregando...</p>

  const aprovar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/aprovar/${id}`, {
      method: "POST"
    })

    navigate("/parceiros")
  }

  const rejeitar = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes/${id}`, {
      method: "DELETE"
    })

    navigate("/parceiros")
  }

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

        <h1>
          {data.tipo === "empresa"
            ? "Solicitação de Parceiro"
            : "Solicitação de Produto"}
        </h1>

        <div className="card">

          <div className="field">
            <span>{data.tipo === "empresa" ? "Empresa" : "Produto"}</span>
            <strong>{data.nome || data.titulo}</strong>
          </div>

          <div className="field">
            <span>Categoria</span>
            <strong>{data.categoria}</strong>
          </div>

          {data.tipo === "empresa" && (
            <>
              <div className="field">
                <span>Email</span>
                <strong>{data.email}</strong>
              </div>

              <div className="field">
                <span>Telefone</span>
                <strong>{data.telefone}</strong>
              </div>
            </>
          )}

          {data.tipo === "produto" && (
            <>
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
            </>
          )}

          <div className="field">
            <span>Descrição</span>
            <p>{data.descricao}</p>
          </div>

          {data.imagem && (
            <div className="preview">
              <img src={data.imagem} />
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