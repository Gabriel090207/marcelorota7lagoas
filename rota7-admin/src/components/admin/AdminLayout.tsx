import "./AdminLayout.css"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

export default function AdminLayout({ children }: any) {

  return (
    <div className="adminWrapper">

      <AdminHeader />

      <div className="adminLayout">

        <AdminSidebar />

        <div className="adminContent">
          {children}
        </div>

      </div>

    </div>
  )
}