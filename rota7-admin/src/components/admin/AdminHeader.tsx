import "./AdminHeader.css"
import logo from "../../assets/images/logo.png"

import { useEffect, useState, useRef } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../services/firebase"
import { useNavigate } from "react-router-dom"
import {
  FiLogOut,
  FiMenu,
  FiBell,
  FiCalendar,
  FiTag,
  FiUsers,
  FiLayers,
  FiImage
} from "react-icons/fi"

import { FiX } from "react-icons/fi"




export default function AdminHeader({ toggleMenu }: any) {

  const [email, setEmail] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)


  const [closing, setClosing] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  const notificationRef = useRef<HTMLDivElement | null>(null)




  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || "")
      }
    })

    return () => unsubscribe()
  }, [])




  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      if (showNotifications) {
        setClosing(true)

        setTimeout(() => {
          setShowNotifications(false)
          setClosing(false)
        }, 200)
      }
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [showNotifications])



useEffect(() => {
  async function loadNotifications() {
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/solicitacoes`)
const data = await res.json()

const hidden = JSON.parse(
  localStorage.getItem("hiddenNotifications") || "[]"
)

const pendentes = data
  .filter((item: any) => item.status === "pendente")
  .filter((item: any) => !hidden.includes(item.id))

setNotifications(pendentes)


      setNotifications(pendentes)

    } catch (error) {
      console.error("Erro ao buscar notificações:", error)
    }
  }

  loadNotifications()

  // 🔥 atualiza a cada 10 segundos
  const interval = setInterval(loadNotifications, 10000)

  return () => clearInterval(interval)
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



        {/* 🔔 NOTIFICAÇÕES */}
  <div 
  className="adminNotifications"
  ref={notificationRef}
  onClick={() => {
  if (showNotifications) {
    setClosing(true)

    setTimeout(() => {
      setShowNotifications(false)
      setClosing(false)
    }, 200)
  } else {
    setShowNotifications(true)
  }
}}
>
  <FiBell />
 <span className="notificationBadge">
  {notifications.length}
</span>

  {(showNotifications || closing) && (
  <div className={`notificationsDropdown ${closing ? "closing" : ""}`}>

 {notifications.map((item: any) => (
  <div key={item.id} className="notificationItem">

    <div className="notificationContent">

      {item.tipo === "empresa" && <FiUsers className="notificationIcon" />}
      {item.tipo === "grupo" && <FiLayers className="notificationIcon" />}
      {item.tipo === "evento" && <FiCalendar className="notificationIcon" />}
      {item.tipo === "produto" && <FiTag className="notificationIcon" />}
      {item.tipo === "galeria" && <FiImage className="notificationIcon" />}

      <span className="notificationText">
        Nova solicitação: {item.nome}
      </span>

    </div>

    <button
      className="removeNotificationBtn"
     onClick={(e) => {
  e.stopPropagation()

  const seen = JSON.parse(
    localStorage.getItem("hiddenNotifications") || "[]"
  )

  const updated = [...seen, item.id]

  localStorage.setItem("hiddenNotifications", JSON.stringify(updated))

  setNotifications((prev) =>
    prev.filter((n) => n.id !== item.id)
  )
}}
    >
      <FiX />
    </button>

  </div>
))}

<div className="clearAllWrapper">
  <button
    className="clearAllBtn"
   onClick={() => {

  const ids = notifications.map(n => n.id)

  const hidden = JSON.parse(
    localStorage.getItem("hiddenNotifications") || "[]"
  )

  const updated = [...hidden, ...ids]

  localStorage.setItem("hiddenNotifications", JSON.stringify(updated))

  setNotifications([])
}}
  >
    Limpar todas
  </button>
</div>

  </div>
)}
</div>

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