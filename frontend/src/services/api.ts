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