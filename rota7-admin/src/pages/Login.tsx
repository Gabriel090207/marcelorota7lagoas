import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { FiMail, FiLock } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login() {
    const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setErro("")
  

    try {
      await signInWithEmailAndPassword(auth, email, senha)

      localStorage.setItem("loginSucesso", "true")
navigate("/admin")

      // depois vamos redirecionar automático
    } catch (err) {
      setErro("Email ou senha incorretos")
    }

    setLoading(false)
  }

  return (
    <div className="loginPage">

      <form className="loginBox" onSubmit={handleLogin}>

        <img src="/logo.png" alt="Rota 7 Lagoas" className="loginLogo" />

        <p className="loginSubtitle">Acesse o painel</p>

        {erro && <span className="msg msg--erro">{erro}</span>}
       

        <div className="inputGroup">
          <FiMail />
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <FiLock />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="loginBtn" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

    </div>
  )
}