import { Routes, Route } from 'react-router-dom'


import Home from '../pages/Home'
import Eventos from '../pages/Eventos'
import Noticias from '../pages/Noticias'
import Classificados from '../pages/Classificados'
import Dicas from '../pages/Dicas'
import Galeria from '../pages/Galeria'
import QuemSomos from '../pages/QuemSomos'
import Grupos from '../pages/Grupos'

import NoticiaDetalhe from "../pages/NoticiaDetalhe"
import DicaDetalhe from "../pages/DicaDetalhe"
import EventoDetalhe from "../pages/EventoDetalhe"


import ParceirosPublic from "../pages/ParceirosPublic"
import QueroAnunciar from "../pages/QueroAnunciar"

import AnunciarEmpresa from "../pages/AnunciarEmpresa"
import AnunciarProduto from "../pages/AnunciarProduto"

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


      <Route path="/noticia/:id" element={<NoticiaDetalhe />} />
      <Route path="/dicas/:id" element={<DicaDetalhe />} />
      <Route path="/eventos/:id" element={<EventoDetalhe />} />
      <Route path="/classificados/parceiros" element={<ParceirosPublic />} />
      <Route path="/quero-anunciar" element={<QueroAnunciar />} />
      <Route path="/anunciar/empresa" element={<AnunciarEmpresa />} />
      <Route path="/anunciar/produto" element={<AnunciarProduto />} />



    </Routes>
  )
}