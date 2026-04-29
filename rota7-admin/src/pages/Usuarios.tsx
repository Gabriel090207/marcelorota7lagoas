import AdminLayout from "../components/admin/AdminLayout"
import "./Usuarios.css"

import { useEffect, useState } from "react"
import { getUsers } from "../services/api"

export default function Usuarios() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <AdminLayout>
      <main className="adminPage">
        <div className="adminPage__header">
          <div>
            <h1>Usuários</h1>
            <p>Usuários cadastrados no portal</p>
          </div>
        </div>

        <div className="usersTable">
          {users.map((user) => (
            <div key={user.id} className="usersTable__row">
              <div className="usersTable__name">
                {user.nome}
              </div>

              <div
                className="usersTable__email"
                title={user.email}
              >
                {user.email}
              </div>

              <div className="usersTable__phone">
                {user.telefone || "-"}
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminLayout>
  )
}