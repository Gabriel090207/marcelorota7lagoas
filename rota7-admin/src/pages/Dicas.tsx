import AdminLayout from "../components/admin/AdminLayout"
import "./Dicas.css"

import { FiPlus, FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { getDicas } from "../services/api"
import ConfirmModal from "../components/admin/ConfirmModal"
import { deleteDica } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Dicas() {

  const [modalOpen, setModalOpen] = useState(false)
const [selectedId, setSelectedId] = useState<string | null>(null)
const navigate = useNavigate()

 const [dicas, setDicas] = useState<any[]>([])


 const handleDelete = async () => {
  if (!selectedId) return

  try {
    await deleteDica(selectedId)

    // remove da lista (sem reload)
    setDicas(prev => prev.filter(d => d.id !== selectedId))

    setModalOpen(false)

  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  getDicas().then(setDicas)
}, [])

  return (
    <AdminLayout>

      <main className="adminPage">

        <div className="adminPage__header">

          <div>
            <h1>Dicas</h1>
            <p>Gerencie as dicas de pilotagem e manutenção</p>
          </div>

          <Link to="/dicas/nova" className="btn btn--primary">
            <FiPlus />
            Nova dica
          </Link>

        </div>

        <div className="adminTable">

          {dicas.map(dica => (

            <div key={dica.id} className="adminTable__row">

              <div className="adminTable__title">
                {dica.titulo}
              </div>

              <div className="adminTable__category">
                {dica.categoria}
              </div>

              <div className="adminTable__actions">

               <button
  className="iconBtn"
  onClick={() => navigate(`/dicas/editar/${dica.id}`)}
>
  <FiEdit />
</button>

               <button
  className="iconBtn danger"
  onClick={() => {
    setSelectedId(dica.id)
    setModalOpen(true)
  }}
>
  <FiTrash />
</button>

              </div>

            </div>

          ))}

        </div>


<ConfirmModal
  open={modalOpen}
  title="Excluir dica"
  message="Tem certeza que deseja excluir esta dica? Essa ação não pode ser desfeita."
  onCancel={() => setModalOpen(false)}
  onConfirm={handleDelete}
/>
      </main>

    </AdminLayout>
  )
}