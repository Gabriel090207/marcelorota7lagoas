import { useState } from "react"
import "./AdminLayout.css"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

export default function AdminLayout({ children }: any) {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="adminWrapper">

      <AdminHeader toggleMenu={() => setMenuOpen(!menuOpen)} />

      <div className="adminLayout">

        <AdminSidebar menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

        <div className="adminContent">
          {children}
        </div>

      </div>

      {menuOpen && (
        <div className="adminOverlay" onClick={() => setMenuOpen(false)} />
      )}

    </div>
  )
}