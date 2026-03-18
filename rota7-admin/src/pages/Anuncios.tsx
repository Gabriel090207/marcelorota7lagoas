import AdminLayout from "../components/admin/AdminLayout"
import "./Anuncios.css"

import { FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import ConfirmModal from "../components/admin/ConfirmModal"

import { getAnuncios, deleteAnuncio } from "../services/api"

export default function Anuncios() {
  const navigate = useNavigate()

  const [abaAtiva, setAbaAtiva] = useState<"anuncios" | "solicitacoes">("anuncios")

  const [anuncios, setAnuncios] = useState<any[]>([])
  const [solicitacoes, setSolicitacoes] = useState<any[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!selectedId) return

    try {
      await deleteAnuncio(selectedId)

      setAnuncios(prev => prev.filter(anuncio => anuncio.id !== selectedId))
      setModalOpen(false)

    } catch (error) {
      console.error(error)
    }
  }

  // anúncios aprovados
  useEffect(() => {
    getAnuncios()
      .then(data => {
        if (Array.isArray(data)) {
          setAnuncios(data)
        } else {
          setAnuncios([])
        }
      })
      .catch(err => {
        console.error(err)
        setAnuncios([])
      })
  }, [])

  // solicitações pendentes de produto
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const produtos = data.filter((item: any) => item.tipo === "produto")
          setSolicitacoes(produtos)
        } else {
          setSolicitacoes([])
        }
      })
      .catch(err => {
        console.error(err)
        setSolicitacoes([])
      })
  }, [])

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Anúncios</h1>
            <p>Gerencie os anúncios do sistema</p>
          </div>

          <Link to="/anuncios/novo" className="btn btn--primary">
            <FiPlus />
            Novo anúncio
          </Link>

        </div>

        {/* ABAS */}
        <div className="adminTabs">

          <button
            className={`adminTab ${abaAtiva === "anuncios" ? "active" : ""}`}
            onClick={() => setAbaAtiva("anuncios")}
          >
            Anúncios
          </button>

          <button
            className={`adminTab ${abaAtiva === "solicitacoes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("solicitacoes")}
          >
            Solicitações
          </button>

        </div>

        {/* ================= ANÚNCIOS ================= */}
        {abaAtiva === "anuncios" && (
          <div className="adminTable">

            {anuncios.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhum anúncio cadastrado
              </p>
            ) : (
              anuncios.map((anuncio) => (

                <div key={anuncio.id} className="adminTable__row">

                  <div className="adminTable__title">
                    {anuncio.titulo}
                  </div>

                  <div className="adminTable__category">
                    {anuncio.categoria || "Sem categoria"}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/anuncios/editar/${anuncio.id}`)}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="iconBtn danger"
                      onClick={() => {
                        setSelectedId(anuncio.id)
                        setModalOpen(true)
                      }}
                    >
                      <FiTrash />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>
        )}

        {/* ================= SOLICITAÇÕES ================= */}
        {abaAtiva === "solicitacoes" && (
          <div className="adminTable">

            {solicitacoes.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                Nenhuma solicitação pendente
              </p>
            ) : (
              solicitacoes.map((s) => (

                <div
                  key={s.id}
                  className="adminTable__row"
                >

                  <div className="adminTable__title">
                    {s.titulo}
                  </div>

                  <div className="adminTable__category">
                    {s.categoria}
                  </div>

                  <div className="adminTable__actions">

                    <button
                      className="iconBtn"
                      onClick={() => navigate(`/anuncios/solicitacoes/${s.id}`)}
                    >
                      <FiEye />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>
        )}

        <ConfirmModal
          open={modalOpen}
          title="Excluir anúncio"
          message="Tem certeza que deseja excluir este anúncio?"
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDelete}
        />

      </main>

    </AdminLayout>
  )
}