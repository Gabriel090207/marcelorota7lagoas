import AdminLayout from "../components/admin/AdminLayout"
import EventDatePicker from "../components/forms/EventDatePicker"

import { uploadImage } from "../services/storage"
import { createEvento } from "../services/api"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FiArrowLeft } from "react-icons/fi"

import "./NovoEvento.css"

export default function NovoEvento() {

  const navigate = useNavigate()

  const [titulo, setTitulo] = useState("")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [local, setLocal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async () => {

    if (!titulo || !data || !local) {
      alert("Preencha os campos obrigatórios")
      return
    }

    let imageUrl = ""

    if (file) {
      imageUrl = await uploadImage(file)
    }

    await createEvento({
      titulo,
      data: `${data} ${hora}`,
      local,
      descricao,
      imagem: imageUrl
    })

    // limpar
    setTitulo("")
    setData("")
    setHora("")
    setLocal("")
    setDescricao("")
    setFile(null)
  }

  return (
    <AdminLayout>

      <main className="novaNoticia">

        <div className="novaNoticia__back" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          <span>Voltar</span>
        </div>

        <h1>Novo evento</h1>

        <div className="form">

          <input
            type="text"
            placeholder="Título do evento"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="formRow">

            <EventDatePicker
              value={data}
              onChange={setData}
            />

            <input
              type="time"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />

          </div>

          <input
            type="text"
            placeholder="Local do evento"
            className="input"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />

          <label className="uploadBox">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
            <span>{file ? file.name : "Selecionar imagem"}</span>
          </label>

          <textarea
            className="input"
            rows={6}
            placeholder="Descrição do evento"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button className="publishBtn" onClick={handleSubmit}>
            Publicar evento
          </button>

        </div>

      </main>

    </AdminLayout>
  )
}