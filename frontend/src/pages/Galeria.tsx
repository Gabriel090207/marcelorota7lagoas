import './Galeria.css'

export default function Galeria() {
  return (
    <main className="galeria">

      {/* HEADER */}
      <section className="galeria__header">
        <div className="galeria__headerInner">
          <span className="galeria__label">
            GALERIA
          </span>

          <h1>
            Registros do motociclismo em Sete Lagoas e região.
          </h1>

          <p>
            Momentos capturados em passeios, encontros,
            trilhas e eventos da comunidade.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="galeria__filters">
        <div className="galeria__filtersInner">
          <button className="galeriaFilter active">Todos</button>
          <button className="galeriaFilter">Passeios</button>
          <button className="galeriaFilter">Trilhas</button>
          <button className="galeriaFilter">Eventos</button>
          <button className="galeriaFilter">Grupos</button>
        </div>
      </section>

      {/* GRID */}
      <section className="galeria__gridSection">
        <div className="galeria__gridInner">

          <div className="galeriaGrid">

            <div className="galeriaItem" />
            <div className="galeriaItem" />
            <div className="galeriaItem" />
            <div className="galeriaItem" />
            <div className="galeriaItem" />
            <div className="galeriaItem" />

          </div>

        </div>
      </section>

    </main>
  )
}