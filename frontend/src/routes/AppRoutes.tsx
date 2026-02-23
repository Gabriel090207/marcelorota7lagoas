import { Routes, Route } from 'react-router-dom'


import Home from '../pages/Home'
import Eventos from '../pages/Eventos'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      
    </Routes>
  )
}