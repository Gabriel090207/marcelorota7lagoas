import AdminLayout from "../components/admin/AdminLayout"

import { FiClock } from "react-icons/fi"

import EventDatePicker from "../components/forms/EventDatePicker"

import "./NovoEvento.css"

export default function NovoEvento() {

  return (

    <AdminLayout>

      <main className="novaNoticia">

        <h1>Novo evento</h1>

        <div className="form">

          {/* TÍTULO */}

          <input
            type="text"
            placeholder="Título do evento"
            className="input"
          />

          {/* DATA E HORA */}

          <div className="formRow">

            <EventDatePicker />

            <div className="timeInputWrapper">

              <FiClock className="timeIcon" />

              <input
                type="time"
                className="input timeInput"
              />

            </div>

          </div>

          {/* LOCAL */}

          <input
            type="text"
            placeholder="Local do evento"
            className="input"
          />

          {/* IMAGEM */}

          <label className="uploadBox">

            <input type="file" />

            <span>Selecionar imagem</span>

          </label>

          {/* DESCRIÇÃO */}

          <textarea
            className="input"
            rows={6}
            placeholder="Descrição do evento"
          />

          {/* BOTÃO */}

          <button className="publishBtn">
            Publicar evento
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}