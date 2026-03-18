const API_URL = import.meta.env.VITE_API_URL

// =======================
// NOTÍCIAS
// =======================

export const getNoticias = async () => {
  const res = await fetch(`${API_URL}/noticias`)
  return res.json()
}

export const getNoticiaById = async (id: string) => {
  const res = await fetch(`${API_URL}/noticias/${id}`)
  return res.json()
}


// =======================
// DICAS
// =======================

export const getDicas = async () => {
  const res = await fetch(`${API_URL}/dicas`)
  return res.json()
}

export const getDicaById = async (id: string) => {
  const res = await fetch(`${API_URL}/dicas/${id}`)
  return res.json()
}



export async function getEventos() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/eventos`)
  return res.json()
}


// =======================
// PARCEIROS
// =======================

export const getParceiros = async () => {
  const res = await fetch(`${API_URL}/parceiros`)
  return res.json()
}

export const getParceiroById = async (id: string) => {
  const res = await fetch(`${API_URL}/parceiros/${id}`)
  return res.json()
}


// =======================
// GRUPOS
// =======================

export const getGrupos = async () => {
  const res = await fetch(`${API_URL}/grupos`)
  return res.json()
}