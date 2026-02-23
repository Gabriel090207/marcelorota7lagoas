import { useEffect, useState } from 'react'
import './AuthModal.css'

import { FiX } from 'react-icons/fi'
import { GiFullMotorcycleHelmet } from 'react-icons/gi'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {

  const [isVisible, setIsVisible] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)

  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }, [isOpen])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }

    if (isVisible) {
      window.addEventListener('keydown', handleEsc)
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isVisible])

  function handleClose() {
    setIsClosing(true)

    setTimeout(() => {
      setIsClosing(false)
      setIsVisible(false)
      onClose()
      document.body.style.overflow = ''
    }, 300)
  }

  if (!isVisible) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!formData.name.trim()) {
        return setError('Informe seu nome.')
      }

      if (formData.password.length < 6) {
        return setError('A senha deve ter no mínimo 6 caracteres.')
      }

      if (formData.password !== formData.confirmPassword) {
        return setError('As senhas não coincidem.')
      }
    }

    if (!formData.email.trim()) {
      return setError('Informe seu e-mail.')
    }

    if (!formData.password.trim()) {
      return setError('Informe sua senha.')
    }

    console.log('Dados enviados:', formData)
  }

  return (
    <div
      className={`authModal__overlay ${isClosing ? 'is-closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`authModal ${isClosing ? 'is-closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="authModal__close"
          onClick={handleClose}
        >
          <FiX size={20} />
        </button>

        <div className="authModal__icon">
          <GiFullMotorcycleHelmet size={43} />
        </div>

        <h3 className="authModal__title">
          {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
        </h3>

        <form className="authModal__form" onSubmit={handleSubmit}>

          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="authModal__field">
            <input
              type="password"
              name="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
            />

            {mode === 'register' && (
              <small className="authModal__hint">
                * mínimo 6 caracteres
              </small>
            )}
          </div>

          {mode === 'register' && (
            <div className="authModal__field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {error && (
            <div className="authModal__error">
              {error}
            </div>
          )}

          <button type="submit" className="authModal__submit">
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="authModal__footer">
          {mode === 'login' ? (
            <>
              <span>Ainda não tem conta?</span>
              <button type="button" onClick={() => setMode('register')}>
                Criar conta
              </button>
            </>
          ) : (
            <>
              <span>Já possui conta?</span>
              <button type="button" onClick={() => setMode('login')}>
                Fazer login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}