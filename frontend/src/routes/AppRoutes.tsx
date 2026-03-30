import { Routes, Route } from 'react-router-dom'

// ================= PÁGINAS PRINCIPAIS =================
import Home from '../pages/Home'
import Eventos from '../pages/Eventos'
import Noticias from '../pages/Noticias'
import Blogs from '../pages/Blogs'
import Classificados from '../pages/Classificados'
import Dicas from '../pages/Dicas'
import Galeria from '../pages/Galeria'
import QuemSomos from '../pages/QuemSomos'
import Grupos from '../pages/Grupos'

// ================= DETALHES =================
import NoticiaDetalhe from "../pages/NoticiaDetalhe"
import DicaDetalhe from "../pages/DicaDetalhe"
import EventoDetalhe from "../pages/EventoDetalhe"
import BlogDetalhe from "../pages/BlogDetalhe"

// ================= CLASSIFICADOS =================
import ParceirosPublic from "../pages/ParceirosPublic"
import ProdutosPublic from "../pages/ProdutosPublic"

// ================= ANÚNCIOS (ENVIO) =================
import QueroAnunciar from "../pages/QueroAnunciar"
import AnunciarEmpresa from "../pages/AnunciarEmpresa"
import AnunciarProduto from "../pages/AnunciarProduto"
import AnunciarEvento from "../pages/AnunciarEvento"
import EnviarFoto from "../pages/EnviarFoto"
import EnviarGrupo from "../pages/EnviarGrupo"

export function AppRoutes() {
  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route path="/" element={<Home />} />

      {/* ================= PÁGINAS PRINCIPAIS ================= */}
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/classificados" element={<Classificados />} />
      <Route path="/dicas" element={<Dicas />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/quem-somos" element={<QuemSomos />} />
      <Route path="/grupos" element={<Grupos />} />

      {/* ================= DETALHES ================= */}
      <Route path="/noticia/:id" element={<NoticiaDetalhe />} />
      <Route path="/dicas/:id" element={<DicaDetalhe />} />
      <Route path="/eventos/:id" element={<EventoDetalhe />} />
      <Route path="/blog/:id" element={<BlogDetalhe />} />

      {/* ================= CLASSIFICADOS ================= */}
      <Route path="/classificados/parceiros" element={<ParceirosPublic />} />
      <Route path="/classificados/produtos" element={<ProdutosPublic />} />

      {/* ================= ENVIO / SOLICITAÇÕES ================= */}
      <Route path="/quero-anunciar" element={<QueroAnunciar />} />

      {/* EMPRESAS */}
      <Route path="/anunciar/empresa" element={<AnunciarEmpresa />} />

      {/* PRODUTOS */}
      <Route path="/anunciar/produto" element={<AnunciarProduto />} />

      {/* EVENTOS */}
      <Route path="/eventos/enviar" element={<AnunciarEvento />} />
      <Route path="/anunciar/evento" element={<AnunciarEvento />} />

      {/* FOTOS */}
      <Route path="/galeria/enviar" element={<EnviarFoto />} />

      {/* GRUPOS */}
      <Route path="/grupos/enviar" element={<EnviarGrupo />} />

    </Routes>
  )
}