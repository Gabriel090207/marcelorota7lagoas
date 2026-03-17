import { useParams } from "react-router-dom"
import AdminLayout from "../components/admin/AdminLayout"
import "./SolicitacaoParceiro.css"

export default function SolicitacaoParceiro() {

  const { id } = useParams()

  // MOCK (depois vem do backend)
  const solicitacao = {
    id,
    empresa: "Oficina Duas Rodas",
    categoria: "Oficina",
    responsavel: "Carlos Henrique",
    telefone: "(31) 99999-9999",
    descricao: "Oficina especializada em motos trail e big trail, atendimento para grupos."
  }

  return (
    <AdminLayout>

      <main className="solicitacaoPage">

        <h1>Solicitação de Parceiro</h1>

        <div className="card">

          <div className="field">
            <span>Empresa</span>
            <strong>{solicitacao.empresa}</strong>
          </div>

          <div className="field">
            <span>Categoria</span>
            <strong>{solicitacao.categoria}</strong>
          </div>

          <div className="field">
            <span>Responsável</span>
            <strong>{solicitacao.responsavel}</strong>
          </div>

          <div className="field">
            <span>Telefone</span>
            <strong>{solicitacao.telefone}</strong>
          </div>

          <div className="field">
            <span>Descrição</span>
            <p>{solicitacao.descricao}</p>
          </div>

        </div>

        <div className="actions">

          <button className="btn approve">
            Aprovar parceiro
          </button>

          <button className="btn reject">
            Rejeitar
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}