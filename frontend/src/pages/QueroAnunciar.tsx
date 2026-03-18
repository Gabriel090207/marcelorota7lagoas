import "./QueroAnunciar.css"

import { FiArrowLeft, FiBriefcase, FiShoppingBag } from "react-icons/fi"
import { useNavigate } from "react-router-dom"


export default function QueroAnunciar() {

    const navigate = useNavigate()

  return (
    <main className="queroAnunciar">

      {/* VOLTAR */}
     <div
  className="noticiaDetalhe__back"
  onClick={() => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/classificados")
    }
  }}
>
  <FiArrowLeft size={18} />
  <span>Voltar</span>
</div>

      {/* HEADER */}
      <div className="queroAnunciar__header">
        <h1>Quero anunciar</h1>
        <p>
          Escolha como você deseja divulgar no portal Rota 7 Lagoas
        </p>
      </div>

      {/* OPÇÕES */}
      <div className="queroAnunciar__options">

        {/* EMPRESA */}
        <div
          className="anuncioCard"
          onClick={() => window.location.href = "/anunciar/empresa"}
        >

          <div className="anuncioCard__icon">
            <FiBriefcase size={28} />
          </div>

          <h3>Divulgar empresa</h3>

          <p>
            Cadastre sua loja, oficina, restaurante ou serviço
            e apareça no portal como parceiro.
          </p>

          <span className="anuncioCard__cta">
            Continuar →
          </span>

        </div>

        {/* PRODUTOS */}
        <div
          className="anuncioCard"
          onClick={() => window.location.href = "/anunciar/produto"}
        >

          <div className="anuncioCard__icon">
            <FiShoppingBag size={28} />
          </div>

          <h3>Anunciar produto</h3>

          <p>
            Venda motos, equipamentos ou acessórios diretamente
            para a comunidade motociclista.
          </p>

          <span className="anuncioCard__cta">
            Continuar →
          </span>

        </div>

      </div>

    </main>
  )
}