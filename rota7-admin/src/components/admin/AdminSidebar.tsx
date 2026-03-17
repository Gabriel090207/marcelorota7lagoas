import "./AdminSidebar.css"
import { NavLink } from "react-router-dom"

import {
  FiGrid,
  FiFileText,
  FiTool,
  FiCalendar,
  FiUsers,
  FiImage
} from "react-icons/fi"

export default function AdminSidebar() {
  return (
    <aside className="adminSidebar">

      <nav className="adminSidebar__nav">

        <NavLink to="/" end className="sidebarItem">
          <FiGrid className="sidebarIcon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/noticias" className="sidebarItem">
          <FiFileText className="sidebarIcon" />
          <span>Notícias</span>
        </NavLink>

        <NavLink to="/dicas" className="sidebarItem">
          <FiTool className="sidebarIcon" />
          <span>Dicas</span>
        </NavLink>

        <NavLink to="/eventos" className="sidebarItem">
          <FiCalendar className="sidebarIcon" />
          <span>Eventos</span>
        </NavLink>

        <NavLink to="/parceiros" className="sidebarItem">
          <FiUsers className="sidebarIcon" />
          <span>Parceiros</span>
        </NavLink>

        <NavLink to="/galeria" className="sidebarItem">
          <FiImage className="sidebarIcon" />
          <span>Galeria</span>
        </NavLink>

      </nav>

    </aside>
  )
}