import "./AdminSidebar.css"
import { NavLink } from "react-router-dom"

import {
  FiGrid,
  FiFileText,
  FiTool,
  FiCalendar,
  FiUsers,
  FiImage,
  FiLayers,
  FiTag,
  FiBookOpen
} from "react-icons/fi"

export default function AdminSidebar({ menuOpen, closeMenu }: any) {
  return (
    <aside className={`adminSidebar ${menuOpen ? "open" : ""}`}>

      <nav className="adminSidebar__nav">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiGrid className="sidebarIcon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/noticias"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiFileText className="sidebarIcon" />
          <span>Notícias</span>
        </NavLink>

        <NavLink
  to="/blogs"
  className={({ isActive }) =>
    `sidebarItem ${isActive ? "active" : ""}`
  }
  onClick={closeMenu}
>
  <FiBookOpen className="sidebarIcon" />
  <span>Blog</span>
</NavLink>

        <NavLink
          to="/dicas"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiTool className="sidebarIcon" />
          <span>Dicas</span>
        </NavLink>

        <NavLink
          to="/eventos"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiCalendar className="sidebarIcon" />
          <span>Eventos</span>
        </NavLink>

         <NavLink
          to="/grupos"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiLayers className="sidebarIcon" />
          <span>Grupos</span>
        </NavLink>


        <NavLink
          to="/parceiros"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiUsers className="sidebarIcon" />
          <span>Parceiros</span>
        </NavLink>

         <NavLink
          to="/anuncios"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiTag className="sidebarIcon" />
          <span>Anúncios</span>
        </NavLink>


        <NavLink
          to="/galeria"
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          <FiImage className="sidebarIcon" />
          <span>Galeria</span>
        </NavLink>

        {/* 🔥 NOVOS */}

       
       
      </nav>

    </aside>
  )
}