import "./ParceirosPublic.css" // 🔥 usa o mesmo CSS

import { useEffect, useState } from "react"
import { getAnuncios } from "../services/api"

import { FiSearch, FiArrowLeft } from "react-icons/fi"
import { useLocation } from "react-router-dom"

export default function ProdutosPublic() {

  const [produtos, setProdutos] = useState<any[]>([])
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todos")

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const categoriaUrl = params.get("categoria")

  useEffect(() => {
    getAnuncios().then(setProdutos)
  }, [])

  useEffect(() => {
    if (categoriaUrl) {
      setCategoria(categoriaUrl)
    }
  }, [categoriaUrl])

  const categorias = ["Todos", "moto", "equipamento", "peças"]

  const filtrados = produtos.filter(p => {

    const matchBusca =
      p.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(busca.toLowerCase())

    const matchCategoria =
      categoria === "Todos" ||
      p.categoria?.toLowerCase().includes(categoria.toLowerCase())

    return matchBusca && matchCategoria
  })

  return (
    <main className="parceirosPublic">

      {/* VOLTAR */}
      <div
        className="noticiaDetalhe__back"
        onClick={() => window.history.back()}
      >
        <FiArrowLeft size={18} />
        <span>Voltar</span>
      </div>

      {/* HEADER */}
      <div className="parceirosPublic__header">
        <h1>Classificados</h1>
        <p>Compra e venda de motos, peças e equipamentos</p>
      </div>

      {/* FILTROS */}
      <div className="parceirosPublic__filters">

        <div className="searchInputWrapper">
          <FiSearch size={18} className="searchIcon" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="categoriaFilters">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`filterButton ${
                categoria === cat ? "active" : ""
              }`}
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
          <p className="emptyState">
            Nenhum produto encontrado
          </p>
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

              <h3>{p.titulo}</h3>

              <p style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                {p.preco}
              </p>

              {p.km && (
                <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                  {p.km} km rodados
                </span>
              )}

              <p>
                {p.descricao?.slice(0, 100)}
              </p>

              <a
                href={`https://wa.me/55${p.telefone?.replace(/\D/g, "")}`}
                target="_blank"
                className="btn btn--primary"
              >
                Falar no WhatsApp
              </a>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}