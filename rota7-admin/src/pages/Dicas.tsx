import AdminLayout from "../components/admin/AdminLayout"
import "./Dicas.css"

import { FiPlus, FiEdit, FiTrash, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"

import { useEffect, useState } from "react"
import { getDicas } from "../services/api"
import ConfirmModal from "../components/admin/ConfirmModal"
import { deleteDica } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Dicas() {

  const [modalOpen, setModalOpen] = useState(false)
const [selectedId, setSelectedId] = useState<string | null>(null)
const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<"success" | "error">("success")
const [toastMessage, setToastMessage] = useState("")



const showToast = (type: "success" | "error", message: string) => {
  setToastType(type)
  setToastMessage(message)
  setToastOpen(true)

  setTimeout(() => {
    setToastOpen(false)
  }, 3200)
}


const navigate = useNavigate()


 const [dicas, setDicas] = useState<any[]>([])


const handleDelete = async () => {
  if (!selectedId) return

  try {
    await deleteDica(selectedId)

    setDicas(prev => prev.filter(d => d.id !== selectedId))

    setModalOpen(false)

    showToast("success", "Dica deletada com sucesso!")

  } catch (error) {
    console.error(error)
    showToast("error", "Erro ao deletar dica.")
  }
}

useEffect(() => {
  getDicas().then(setDicas)
}, [])


const dicasOrdenadas = [...dicas].sort((a, b) => {
  const dateA = new Date(a.data || a.created_at || 0).getTime()
  const dateB = new Date(b.data || b.created_at || 0).getTime()

  return dateB - dateA
})

  return (
    <AdminLayout>

      <main className="adminPage">


        <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>

  <div className="adminToast__icon">
    {toastType === "success"
      ? <FiCheckCircle size={18} />
      : <FiAlertCircle size={18} />}
  </div>

  <div className="adminToast__content">
    <strong>
      {toastType === "success" ? "Sucesso" : "Atenção"}
    </strong>
    <span>{toastMessage}</span>
  </div>

  <button
    className="adminToast__close"
    onClick={() => setToastOpen(false)}
    type="button"
  >
    <FiX size={18} />
  </button>

</div>

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

         {dicasOrdenadas.map(dica => (

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