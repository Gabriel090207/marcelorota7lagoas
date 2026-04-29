import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"

// ================= DASHBOARD =================
import Dashboard from "./pages/Dashboard"
import Usuarios from "./pages/Usuarios"

// ================= CONTEÚDO =================
import Noticias from "./pages/Noticias"
import NovaNoticia from "./pages/NovaNoticia"
import EditarNoticia from "./pages/EditarNoticia"

import Dicas from "./pages/Dicas"
import NovaDica from "./pages/NovaDica"
import EditarDica from "./pages/EditarDica"

import Eventos from "./pages/Eventos"
import NovoEvento from "./pages/NovoEvento"
import EditarEvento from "./pages/EditarEvento"

import Blogs from "./pages/Blogs"
import NovoBlog from "./pages/NovoBlog"
import EditarBlog from "./pages/EditarBlog"

// ================= CLASSIFICADOS =================
import Parceiros from "./pages/Parceiros"
import NovoParceiro from "./pages/NovoParceiro"
import EditarParceiro from "./pages/EditarParceiro"

// ================= SOLICITAÇÕES =================
import SolicitacaoParceiro from "./pages/SolicitacaoParceiro"
import SolicitacaoAnuncio from "./pages/SolicitacaoAnuncio"
import SolicitacaoEvento from "./pages/SolicitacaoEvento"
import SolicitacaoGrupo from "./pages/SolicitacaoGrupo"
import SolicitacaoImagem from "./pages/SolicitacaoImagem"

// ================= GALERIA =================
import Galeria from "./pages/Galeria"
import NovaImagem from "./pages/NovaImagem"

// ================= GRUPOS =================
import Grupos from "./pages/Grupos"
import NovoGrupo from "./pages/NovoGrupo"
import EditarGrupo from "./pages/EditarGrupo"

// ================= ANÚNCIOS =================
import Anuncios from "./pages/Anuncios"
import NovoAnuncio from "./pages/NovoAnuncio"
import EditarAnuncio from "./pages/EditarAnuncio"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= DASHBOARD ================= */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
  path="/usuarios" 
  element={
    <PrivateRoute>
      <Usuarios />
    </PrivateRoute>
  } 
/>

        {/* ================= NOTÍCIAS ================= */}
        <Route path="/noticias" element={<PrivateRoute><Noticias /></PrivateRoute>} />
        <Route path="/noticias/nova" element={<PrivateRoute><NovaNoticia /></PrivateRoute>} />
        <Route path="/noticias/editar/:id" element={<PrivateRoute><EditarNoticia /></PrivateRoute>} />

        {/* ================= DICAS ================= */}
        <Route path="/dicas" element={<PrivateRoute><Dicas /></PrivateRoute>} />
        <Route path="/dicas/nova" element={<PrivateRoute><NovaDica /></PrivateRoute>} />
        <Route path="/dicas/editar/:id" element={<PrivateRoute><EditarDica /></PrivateRoute>} />

        {/* ================= EVENTOS ================= */}
        <Route path="/eventos" element={<PrivateRoute><Eventos /></PrivateRoute>} />
        <Route path="/eventos/novo" element={<PrivateRoute><NovoEvento /></PrivateRoute>} />
        <Route path="/eventos/editar/:id" element={<PrivateRoute><EditarEvento /></PrivateRoute>} />

        {/* ================= BLOGS ================= */}
        <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
        <Route path="/blogs/novo" element={<PrivateRoute><NovoBlog /></PrivateRoute>} />
        <Route path="/blogs/editar/:id" element={<EditarBlog />} />

        {/* ================= PARCEIROS ================= */}
        <Route path="/parceiros" element={<PrivateRoute><Parceiros /></PrivateRoute>} />
        <Route path="/parceiros/novo" element={<PrivateRoute><NovoParceiro /></PrivateRoute>} />
        <Route path="/parceiros/editar/:id" element={<PrivateRoute><EditarParceiro /></PrivateRoute>} />

        {/* ================= SOLICITAÇÕES ================= */}
        <Route 
          path="/solicitacoes/:id" 
          element={
            <PrivateRoute>
              <SolicitacaoParceiro />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/anuncios/solicitacoes/:id" 
          element={
            <PrivateRoute>
              <SolicitacaoAnuncio />
            </PrivateRoute>
          } 
        />

        <Route 
  path="/eventos/solicitacoes/:id" 
  element={
    <PrivateRoute>
      <SolicitacaoEvento />
    </PrivateRoute>
  } 
/>

<Route path="/grupos/solicitacoes/:id" element={<SolicitacaoGrupo />} />
<Route path="/galeria/solicitacoes/:id" element={<SolicitacaoImagem />} />

        {/* ================= ANÚNCIOS ================= */}
        <Route path="/anuncios" element={<PrivateRoute><Anuncios /></PrivateRoute>} />
        <Route path="/anuncios/novo" element={<PrivateRoute><NovoAnuncio /></PrivateRoute>} />
        <Route path="/anuncios/editar/:id" element={<PrivateRoute><EditarAnuncio /></PrivateRoute>} />

        {/* ================= GALERIA ================= */}
        <Route path="/galeria" element={<PrivateRoute><Galeria /></PrivateRoute>} />
        <Route path="/galeria/nova" element={<PrivateRoute><NovaImagem /></PrivateRoute>} />

        {/* ================= GRUPOS ================= */}
        <Route path="/grupos" element={<PrivateRoute><Grupos /></PrivateRoute>} />
        <Route path="/grupos/novo" element={<PrivateRoute><NovoGrupo /></PrivateRoute>} />
        <Route path="/grupos/editar/:id" element={<PrivateRoute><EditarGrupo /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App