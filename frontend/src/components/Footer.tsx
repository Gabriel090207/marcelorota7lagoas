import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiMail } from 'react-icons/fi'
import logo from '../assets/logo.png'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* COLUNA 1 - MARCA */}
        <div className="footer__brand">
          <img src={logo} alt="Rota 7 Lagoas" className="footer__logo" />

          <p>
            O portal oficial do motociclismo em Sete Lagoas.
            Eventos, notícias e o mercado regional reunidos em um só lugar.
          </p>
        </div>

        {/* COLUNA 2 - PORTAL */}
        <div className="footer__links">
          <h4>Portal</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/noticias">Notícias</Link></li>
            <li><Link to="/eventos">Agenda</Link></li>
            <li><Link to="/dicas">Dicas</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/quem-somos">Quem Somos</Link></li>
          </ul>
        </div>

        {/* COLUNA 3 - COMUNIDADE */}
        <div className="footer__links">
          <h4>Comunidade</h4>
          <ul>
            <li><Link to="/grupos">Moto Clubes</Link></li>
            <li><Link to="/eventos">Enviar Evento</Link></li>
            <li><Link to="/galeria">Enviar Fotos</Link></li>
          </ul>
        </div>

        {/* COLUNA 4 - COMERCIAL */}
        <div className="footer__links">
          <h4>Comercial</h4>
          <ul>
            <li><Link to="/classificados">Classificados</Link></li>
            <li><a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">Anunciar no Portal</a></li>
            <li><a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">Seja Parceiro</a></li>
          </ul>
        </div>

        {/* COLUNA 5 - CONTATO */}
        <div className="footer__contact">
          <h4>Contato</h4>

          <div className="footer__contactItem">
            <FiMail size={16} />
            <span>contato@rota7lagoas.com.br</span>
          </div>

          <div className="footer__socials">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FiInstagram size={18} />
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <FiFacebook size={18} />
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Rota 7 Lagoas.
        <span> Desenvolvido para fortalecer o motociclismo regional.</span>
      </div>
    </footer>
  )
}