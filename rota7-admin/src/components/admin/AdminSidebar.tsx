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

export default function AdminSidebar({ menuOpen, closeMenu }: any) {
  return (
    <aside className={`adminSidebar ${menuOpen ? "open" : ""}`}>

      <nav className="adminSidebar__nav">

        <NavLink to="/admin" className="sidebarItem" onClick={closeMenu}>
          <FiGrid className="sidebarIcon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/noticias" className="sidebarItem" onClick={closeMenu}>
          <FiFileText className="sidebarIcon" />
          <span>Notícias</span>
        </NavLink>

        <NavLink to="/dicas" className="sidebarItem" onClick={closeMenu}>
          <FiTool className="sidebarIcon" />
          <span>Dicas</span>
        </NavLink>

        <NavLink to="/eventos" className="sidebarItem" onClick={closeMenu}>
          <FiCalendar className="sidebarIcon" />
          <span>Eventos</span>
        </NavLink>

        <NavLink to="/parceiros" className="sidebarItem" onClick={closeMenu}>
          <FiUsers className="sidebarIcon" />
          <span>Parceiros</span>
        </NavLink>

        <NavLink to="/galeria" className="sidebarItem" onClick={closeMenu}>
          <FiImage className="sidebarIcon" />
          <span>Galeria</span>
        </NavLink>

      </nav>

    </aside>
  )
}