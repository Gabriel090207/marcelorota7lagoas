import './SectionDivider.css'
import logo from '../../assets/logo.png'

export function SectionDivider() {
  return (
    <div className="sectionDivider">
      <div className="sectionDivider__line" />

      <div className="sectionDivider__logo">
        <img src={logo} alt="Rota 7 Lagoas" />
      </div>

      <div className="sectionDivider__line" />
    </div>
  )
}