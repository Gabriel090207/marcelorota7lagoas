import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "../services/firebase"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ color: "#fff", padding: "20px" }}>Carregando...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}