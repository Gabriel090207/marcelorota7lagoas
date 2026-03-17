import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import "./NovaNoticia.css"

export default function NovaNoticia() {

  return (
    <AdminLayout>

      <main className="novaNoticia">

        <div className="novaNoticia__header">
          <h1>Nova notícia</h1>
        </div>

        <div className="form">

          {/* TITULO */}
          <input
            type="text"
            placeholder="Título da notícia"
            className="input"
          />

          {/* CATEGORIA + IMAGEM */}
          <div className="formRow">

            <div className="field">
              <label>Categoria</label>

              <select className="selectInput">
                <option value="">Selecione</option>
                <option>Mercado</option>
                <option>Região</option>
                <option>Dicas</option>
              </select>
            </div>

            <div className="field">
              <label>Imagem de capa</label>

              <label className="uploadBox">
                <input type="file" />
                <span>Selecionar imagem</span>
              </label>

            </div>

          </div>

          {/* EDITOR */}
          <RichTextEditor />

          {/* BOTAO */}
          <button className="publishBtn">
            Publicar notícia
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}