import "./ParceirosPublic.css"

import { useEffect, useState } from "react"
import { getParceiros } from "../services/api"
import { FiSearch, FiArrowLeft } from "react-icons/fi"



export default function ParceirosPublic() {

  const [parceiros, setParceiros] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todos")

  useEffect(() => {
    getParceiros().then(setParceiros)
  }, [])

  const categorias = [
    "Todos",
    "Oficina",
    "Equipamentos",
    "Peças",
    "Concessionária",
    "Restaurante",
    "Hotel / Pousada"
  ]

  const filtrados = parceiros.filter(p => {
    const matchBusca =
      p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(busca.toLowerCase())

    const matchCategoria =
      categoria === "Todos" || p.categoria === categoria

    return matchBusca && matchCategoria
  })

  return (
    <main className="parceirosPublic">

        <div
  className="noticiaDetalhe__back"
  onClick={() => window.history.back()}
>
  <FiArrowLeft size={18} />
  <span>Voltar</span>
</div>

      {/* HEADER */}
      <div className="parceirosPublic__header">
        <h1>Parceiros do Portal</h1>
        <p>Empresas que movimentam o motociclismo na região</p>
      </div>

      {/* FILTROS */}
      <div className="parceirosPublic__filters">

        <div className="searchInputWrapper">
          <FiSearch size={18} className="searchIcon" />
          <input
            type="text"
            placeholder="Buscar parceiro..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="categoriaFilters">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`filterButton ${categoria === cat ? "active" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* GRID */}
      <div className="parceirosGrid">

        {filtrados.length === 0 && (
          <p className="emptyState">Nenhum parceiro encontrado</p>
        )}

        {filtrados.map(p => (

          <div key={p.id} className="parceiroCard">

            <div
              className="parceiroImage"
              style={{
                backgroundImage: `url(${p.imagem || ""})`
              }}
            />

            <div className="parceiroContent">

              <span className="parceiroCategoria">
                {p.categoria}
              </span>

              <h3>{p.nome}</h3>

              <p>
                {p.descricao?.slice(0, 120)}
              </p>

              <a
                href={`mailto:${p.email}`}
                className="btn btn--primary"
              >
                Entrar em contato
              </a>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}