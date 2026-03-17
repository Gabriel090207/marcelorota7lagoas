import AdminLayout from "../components/admin/AdminLayout"
import RichTextEditor from "../components/editor/RichTextEditor"
import "./NovaDica.css"

export default function NovaDica() {

  return (
    <AdminLayout>

      <main className="novaNoticia">

        <h1>Nova dica</h1>

        <div className="form">

          <input
            type="text"
            placeholder="Título da dica"
            className="input"
          />

          <div className="formRow">

            <select className="selectInput">
              <option>Categoria</option>
              <option>Pilotagem</option>
              <option>Manutenção</option>
              <option>Segurança</option>
            </select>

            <label className="uploadBox">
              <input type="file" />
              <span>Selecionar imagem</span>
            </label>

          </div>

          <RichTextEditor />

          <button className="publishBtn">
            Publicar dica
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}