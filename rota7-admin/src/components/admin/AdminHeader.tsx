import "./AdminHeader.css"
import logo from "../../assets/images/logo.png"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../services/firebase"
import { useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import { FiMenu } from "react-icons/fi"

export default function AdminHeader({ toggleMenu }: any) {

  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || "")
      }
    })

    return () => unsubscribe()
  }, [])

  const initials = email
    ? email.substring(0, 2).toUpperCase()
    : ""

  async function handleLogout() {
    await signOut(auth)
    navigate("/")
  }

  return (
    <header className="adminHeader">

      <div className="adminHeader__left">

  <button className="menuBtn" onClick={toggleMenu}>
    <FiMenu />
  </button>

  <img src={logo} alt="Rota 7 Lagoas" className="logoDesktop" />

</div>

      <div className="adminHeader__right">

        <div className="adminUser">

          <div className="adminUser__info">
            <span className="adminUser__name">
              {email}
            </span>
          </div>

          <div className="adminUser__avatar">
            {initials}
          </div>

          <button 
            className="logoutBtn"
            onClick={handleLogout}
            title="Sair"
          >
            <FiLogOut />
          </button>

        </div>

      </div>

    </header>
  )
}