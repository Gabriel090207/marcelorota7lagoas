import "./AdminHeader.css"
import logo from "../../assets/images/logo.png"

export default function AdminHeader() {

  const userName = "Marcelo Rocha"

  const initials = userName
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0,2)

  return (
    <header className="adminHeader">

      <div className="adminHeader__left">
        <img src={logo} alt="Rota 7 Lagoas" />
      </div>

      <div className="adminHeader__right">

        <div className="adminUser">

          <div className="adminUser__info">
            <span className="adminUser__name">
              Marcelo Rocha
            </span>
          </div>

          <div className="adminUser__avatar">
            {initials}
          </div>

        </div>

      </div>

    </header>
  )
}