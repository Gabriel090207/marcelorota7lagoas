import AdminLayout from "../components/admin/AdminLayout"
import "./NovaImagem.css"

export default function NovaImagem() {

  return (
    <AdminLayout>

      <main className="novaImagem">

        <div className="novaImagem__header">
          <h1>Adicionar imagem</h1>
          <p>Envie uma nova imagem para a galeria</p>
        </div>

        <div className="form">

          {/* TITULO */}
          <input
            type="text"
            placeholder="Título da imagem (opcional)"
            className="input"
          />

          {/* UPLOAD */}
          <div className="field">
            <label>Imagem</label>

            <label className="uploadBox">
              <input type="file" />
              <span>Selecionar imagem</span>
            </label>
          </div>

          {/* PREVIEW */}
          <div className="previewBox">
            <span>Preview da imagem</span>
          </div>

          {/* BOTÃO */}
          <button className="publishBtn">
            Enviar imagem
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}