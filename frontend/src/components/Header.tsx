import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FiUser, FiX, FiMenu, FiShoppingCart } from 'react-icons/fi'
import logo from '../assets/logo.png'
import './Header.css'

import { AuthModal } from './AuthModal/AuthModal'

export function Header() {


  const location = useLocation()
  const isClassificados = location.pathname === '/classificados'


  const [isAuthOpen, setIsAuthOpen] = useState(false)
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

  return (
    <>
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


            {isClassificados && (
  <button className="header__cartBtn">
    <FiShoppingCart size={18} />
    Carrinho
  </button>
)}
            {/* Botão Entrar (desktop) */}
            <button
              className="btn btn--primary header__loginBtn"
              onClick={() => setIsAuthOpen(true)}
            >
              <FiUser size={18} />
              Entrar
            </button>

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
            <NavLink to="/eventos" onClick={closeMenu}>Agenda</NavLink>
            <NavLink to="/dicas" onClick={closeMenu}>Dicas</NavLink>
            <NavLink to="/classificados" onClick={closeMenu}>Classificados</NavLink>
           <NavLink to="/quem-somos" onClick={closeMenu}>Quem Somos</NavLink>
          </nav>

          <div className="header__drawerDivider" />


{isClassificados && (
  <button className="header__drawerCart">
    <FiShoppingCart size={18} />
    Carrinho
  </button>
)}
          {/* Botão Entrar (mobile) */}
          <button
            className="btn btn--primary header__drawerLogin"
            onClick={() => {
              closeMenu()
              setIsAuthOpen(true)
            }}
          >
            <FiUser size={18} />
            Entrar
          </button>
        </aside>
      </header>

      {/* MODAL DE AUTENTICAÇÃO */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  )
}