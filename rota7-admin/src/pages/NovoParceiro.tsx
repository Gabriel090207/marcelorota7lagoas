import AdminLayout from "../components/admin/AdminLayout"
import "./NovoParceiro.css"

export default function NovoParceiro() {

  return (
    <AdminLayout>

      <main className="novoParceiro">

        <div className="novoParceiro__header">
          <h1>Novo parceiro</h1>
        </div>

        <div className="form">

          {/* NOME */}
          <input
            type="text"
            placeholder="Nome da empresa"
            className="input"
          />

          {/* CATEGORIA + TELEFONE */}
          <div className="formRow">

            <div className="field">
              <label>Categoria</label>

              <select className="selectInput">
                <option value="">Selecione</option>
                <option>Oficina</option>
                <option>Equipamentos</option>
                <option>Peças</option>
                <option>Concessionária</option>
                <option>Restaurante</option>
                <option>Hotel / Pousada</option>
              </select>
            </div>

            <div className="field">
              <label>Telefone</label>

              <input
                type="text"
                placeholder="(31) 99999-9999"
                className="input"
              />
            </div>

          </div>

          {/* WHATSAPP + IMAGEM */}
          <div className="formRow">

            <div className="field">
              <label>WhatsApp</label>

              <input
                type="text"
                placeholder="(31) 99999-9999"
                className="input"
              />
            </div>

            <div className="field">
              <label>Imagem</label>

              <label className="uploadBox">
                <input type="file" />
                <span>Selecionar imagem</span>
              </label>

            </div>

          </div>

          {/* DESCRIÇÃO */}
          <div className="field">
            <label>Descrição</label>

            <textarea
              className="textarea"
              placeholder="Descreva o parceiro..."
            />
          </div>

          {/* BOTÃO */}
          <button className="publishBtn">
            Salvar parceiro
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}