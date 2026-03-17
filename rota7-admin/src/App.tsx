import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Noticias from "./pages/Noticias"
import Dicas from "./pages/Dicas"
import Eventos from "./pages/Eventos"
import Parceiros from "./pages/Parceiros"
import Galeria from "./pages/Galeria"

import NovaNoticia from "./pages/NovaNoticia"
import NovaDica from "./pages/NovaDica"
import NovoEvento from "./pages/NovoEvento"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/nova" element={<NovaNoticia />} />


        <Route path="/dicas" element={<Dicas />} />
        <Route path="/dicas/nova" element={<NovaDica />} />


        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/novo" element={<NovoEvento />} />


        <Route path="/parceiros" element={<Parceiros />} />
        <Route path="/galeria" element={<Galeria />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App