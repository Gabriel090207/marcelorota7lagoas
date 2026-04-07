import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiX, FiMenu, FiUser, FiCheckCircle, FiAlertCircle, FiLogOut } from 'react-icons/fi'
import logo from '../assets/logo.png'
import logoLogin from '../assets/logo7.png'
import './Header.css'


import { registerUser, loginUser } from "../services/api"

export function Header() {



  const [nome, setNome] = useState("")
const [email, setEmail] = useState("")
const [telefone, setTelefone] = useState("")
const [senha, setSenha] = useState("")


  const [portalUser, setPortalUser] = useState<any>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
const [toastType, setToastType] = useState<"success" | "error">("success")
const [toastMessage, setToastMessage] = useState("")

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function openMenu() {
    setIsMenuOpen(true)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  // Fecha com ESC (menu mobile)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }

    if (isMenuOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])


  useEffect(() => {
  const storedUser = localStorage.getItem("portalUser")

  if (storedUser) {
    setPortalUser(JSON.parse(storedUser))
  }
}, [])


useEffect(() => {
  const openModal = () => {
    console.log("evento openLoginModal recebido 🔥")
    setShowLoginModal(true)
  }

  window.addEventListener("openLoginModal", openModal)

  return () => {
    window.removeEventListener("openLoginModal", openModal)
  }
}, [])

const resetForm = () => {
  setNome("")
  setEmail("")
  setTelefone("")
  setSenha("")
  setIsRegister(false) // 👈 sempre volta para "Entrar"
}

const handleAuth = async () => {

  if (!email || !senha) {
    showToast("error", "Preencha email e senha")
    return
  }

  if (isRegister && (!nome || !telefone)) {
    showToast("error", "Preencha todos os campos")
    return
  }

  try {

    // 👉 CADASTRO
    if (isRegister) {

      const res = await registerUser({
        nome,
        email,
        telefone,
        senha
      })

      if (res.erro) {
        showToast("error", res.erro)
        return
      }

     localStorage.setItem("portalUser", JSON.stringify(res))
setPortalUser(res)

// 🔥 ADICIONA AQUI TAMBÉM
window.dispatchEvent(new Event("loginSuccess"))

showToast("success", "Conta criada com sucesso")

resetForm()
setShowLoginModal(false)

      return
    }

    // 👉 LOGIN
    const res = await loginUser({
      email,
      senha
    })

    if (res.erro) {
      showToast("error", res.erro)
      return
    }

    localStorage.setItem("portalUser", JSON.stringify(res))
setPortalUser(res)

// 🔥 ADICIONA ISSO
window.dispatchEvent(new Event("loginSuccess"))

showToast("success", "Login realizado com sucesso")
resetForm()
setShowLoginModal(false)

  } catch (err) {
    showToast("error", "Erro ao conectar com servidor")
  }
}



const handleTelefone = (value: string) => {
  let v = value.replace(/\D/g, "")

  if (v.length > 11) v = v.slice(0, 11)

  let formatted = ""

  if (v.length <= 2) {
    formatted = v
  } else if (v.length <= 6) {
    formatted = `(${v.slice(0, 2)}) ${v.slice(2)}`
  } else if (v.length <= 10) {
    formatted = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`
  } else {
    formatted = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
  }

  setTelefone(formatted)
}

const showToast = (type: "success" | "error", message: string) => {
  setToastType(type)
  setToastMessage(message)
  setToastOpen(true)

  setTimeout(() => setToastOpen(false), 3000)
}

  return (
    <>

    <div className={`adminToast adminToast--${toastType} ${toastOpen ? "show" : ""}`}>
  <div className="adminToast__icon">
    {toastType === "success"
      ? <FiCheckCircle size={18} />
      : <FiAlertCircle size={18} />
    }
  </div>

  <div className="adminToast__content">
    <strong>{toastType === "success" ? "Sucesso" : "Atenção"}</strong>
    <span>{toastMessage}</span>
  </div>

  <button className="adminToast__close" onClick={() => setToastOpen(false)}>
    <FiX size={18} />
  </button>
</div>

      <header className="header">
        <div className="header__container">
          {/* Logo esquerda */}
          <div className="header__left">
            <img src={logo} alt="Rota 7 Lagoas" />
          </div>

          {/* Menu desktop */}
          <nav className="header__nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Início
            </NavLink>
            <NavLink to="/noticias" className={({ isActive }) => (isActive ? 'active' : '')}>
              Notícias
            </NavLink>
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
            <NavLink to="/eventos" className={({ isActive }) => (isActive ? 'active' : '')}>
              Agenda
            </NavLink>
            <NavLink to="/dicas" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dicas
            </NavLink>
            <NavLink to="/classificados" className={({ isActive }) => (isActive ? 'active' : '')}>
              Classificados
            </NavLink>
            <NavLink to="/quem-somos" className={({ isActive }) => (isActive ? 'active' : '')}>
              Quem Somos
            </NavLink>
          </nav>

          {/* Ações direita */}
         <div className="header__actions">

  {!portalUser ? (

    <button
      className="btn btn--primary header__loginBtn"
      onClick={() => setShowLoginModal(true)}
    >
      <FiUser size={16} />
      <span>Entrar</span>
    </button>

  ) : (
<div className="headerUser">

  <span className="headerUser__name">
    {portalUser.nome || portalUser.email}
  </span>

  <div className="headerUser__avatar">
    {portalUser.nome
      ? portalUser.nome.substring(0, 2).toUpperCase()
      : portalUser.email.substring(0, 2).toUpperCase()
    }
  </div>

  <button
    className="headerLogoutBtn"
    onClick={() => {
      localStorage.removeItem("portalUser")
      setPortalUser(null)
      window.dispatchEvent(new Event("loginSuccess"))
      showToast("success", "Logout realizado com sucesso")
    }}
    title="Sair"
  >
    <FiLogOut size={18} />
  </button>

</div>
   

  )}

            {/* Botão menu (mobile) */}
            <button
              className="header__menuBtn"
              aria-label="Abrir menu"
              onClick={openMenu}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>

        {/* OVERLAY MOBILE */}
        <div
          className={`header__overlay ${isMenuOpen ? 'is-open' : ''}`}
          onClick={closeMenu}
        />

        {/* SIDEBAR MOBILE */}
        <aside className={`header__drawer ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="header__drawerTop">
            <span className="header__drawerTitle">Menu</span>
            <button
              className="header__closeBtn"
              aria-label="Fechar menu"
              onClick={closeMenu}
            >
              <FiX size={22} />
            </button>
          </div>

          <nav className="header__drawerNav">

            
            <NavLink to="/" onClick={closeMenu}>Início</NavLink>
            <NavLink to="/noticias" onClick={closeMenu}>Notícias</NavLink>
            <NavLink to="/blogs" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/eventos" onClick={closeMenu}>Agenda</NavLink>
            <NavLink to="/dicas" onClick={closeMenu}>Dicas</NavLink>
            <NavLink to="/classificados" onClick={closeMenu}>Classificados</NavLink>
            <NavLink to="/quem-somos" onClick={closeMenu}>Quem Somos</NavLink>
          </nav>

           <div className="header__drawerDivider" />

   {!portalUser && (
  <button
    className="header__drawerLogin btn btn--primary"
    onClick={() => {
      closeMenu()
      setShowLoginModal(true)
    }}
  >
    <FiUser size={16} />
    <span>Entrar</span>
  </button>
)}
         
        </aside>
      </header>

      {showLoginModal && (
  <div className="loginModal">

    {/* OVERLAY */}
    <div
      className="loginOverlay"
      onClick={() => {
  resetForm()

setShowLoginModal(false)
}}
    />

    {/* CONTEÚDO */}
    <div className="loginContent">

      {/* FECHAR */}
      <button
        className="loginClose"
       onClick={() => {
 
  resetForm()
setShowLoginModal(false)
}}
      >
        <FiX size={20} />
      </button>

      {/* HEADER */}
      <div className="loginHeader">
        <img src={logoLogin} alt="Logo" />
        <h2>{isRegister ? "Criar conta" : "Entrar"}</h2>
      </div>

      {/* FORM */}
      <div className="loginForm">

        {isRegister && (
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {isRegister && (
       <input
  placeholder="Telefone"
  value={telefone}
  onChange={(e) => handleTelefone(e.target.value)}
/>
        )}

        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* BOTÃO PRINCIPAL */}
        <button className="loginSubmit" onClick={handleAuth}>
          {isRegister ? "Criar conta" : "Entrar"}
        </button>

        {/* TEXTO */}
        <span className="loginSwitchText">
          {isRegister ? "Já possui conta?" : "Não possui conta?"}
        </span>

        {/* BOTÃO SECUNDÁRIO */}
        <button
          className="loginSwitch"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Entrar" : "Criar conta"}
        </button>

      </div>

    </div>
  </div>
)}



    </>
  )
}