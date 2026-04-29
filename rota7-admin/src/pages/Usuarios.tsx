import AdminLayout from "../components/admin/AdminLayout"
import "./Usuarios.css"

import { useEffect, useState } from "react"
import { FiTrash, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi"

import ConfirmModal from "../components/admin/ConfirmModal"
import { getUsers, deleteUser } from "../services/api"

export default function Usuarios() {
  const [users, setUsers] = useState<any[]>([])

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

  const loadUsers = () => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return

    try {
      await deleteUser(selectedId)

      setUsers((prev) => prev.filter((u) => u.id !== selectedId))

      setModalOpen(false)

      showToast("success", "Usuário removido com sucesso!")
    } catch (error) {
      console.error(error)
      showToast("error", "Erro ao remover usuário.")
    }
  }

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
            <h1>Usuários</h1>
            <p>Usuários cadastrados no portal</p>
          </div>
        </div>

        <div className="adminTable">
          {users.map((user) => (
            <div key={user.id} className="adminTable__rowUsers">

              <div className="adminTable__title">
                {user.nome}
              </div>

              <div className="adminTable__category">
                {user.email}
              </div>

              <div className="adminTable__actions">
                <button
                  className="iconBtn danger"
                  onClick={() => {
                    setSelectedId(user.id)
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
          title="Excluir usuário"
          message="Tem certeza que deseja remover este usuário?"
          onConfirm={handleDelete}
          onCancel={() => setModalOpen(false)}
        />

      </main>
    </AdminLayout>
  )
}