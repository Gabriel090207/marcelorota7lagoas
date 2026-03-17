import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"

import Dashboard from "./pages/Dashboard"
import Noticias from "./pages/Noticias"
import Dicas from "./pages/Dicas"
import Eventos from "./pages/Eventos"


import Parceiros from "./pages/Parceiros"
import SolicitacaoParceiro from "./pages/SolicitacaoParceiro"


import Galeria from "./pages/Galeria"

import NovaNoticia from "./pages/NovaNoticia"
import EditarNoticia from "./pages/EditarNoticia"

import NovaDica from "./pages/NovaDica"
import EditarDica from "./pages/EditarDica"


import NovoEvento from "./pages/NovoEvento"
import NovoParceiro from "./pages/NovoParceiro"
import NovaImagem from "./pages/NovaImagem"


function App() {
  return (
    <BrowserRouter>
      <Routes>


       <Route path="/" element={<Login />} />
        <Route 
  path="/admin" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>

<Route 
  path="/noticias" 
  element={
    <PrivateRoute>
      <Noticias />
    </PrivateRoute>
  } 
/>
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/nova" element={<NovaNoticia />} />
        <Route path="/noticias/editar/:id" element={<EditarNoticia />} />


        <Route path="/dicas" element={<Dicas />} />
        <Route path="/dicas/nova" element={<NovaDica />} />
        <Route path="/dicas/editar/:id" element={<EditarDica />} />


        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/novo" element={<NovoEvento />} />


        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/parceiros/solicitacoes/:id" element={<SolicitacaoParceiro />} />
        <Route path="/parceiros/novo" element={<NovoParceiro />} />

        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/nova" element={<PrivateRoute><NovaImagem /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App