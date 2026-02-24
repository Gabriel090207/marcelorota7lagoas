import { Routes, Route } from 'react-router-dom'


import Home from '../pages/Home'
import Eventos from '../pages/Eventos'
import Noticias from '../pages/Noticias'
import Classificados from '../pages/Classificados'
import Dicas from '../pages/Dicas'
import Galeria from '../pages/Galeria'
import QuemSomos from '../pages/QuemSomos'
import Grupos from '../pages/Grupos'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/classificados" element={<Classificados />} />
      <Route path="/dicas" element={<Dicas />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/quem-somos" element={<QuemSomos />} />
      <Route path="/grupos" element={<Grupos />} />



    </Routes>
  )
}