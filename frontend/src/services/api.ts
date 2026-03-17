export const API_URL = import.meta.env.VITE_API_URL

export const getNoticias = async () => {
  const res = await fetch(`${API_URL}/noticias`)
  return res.json()
}

export const getNoticiaById = async (id: string) => {
  const res = await fetch(`${API_URL}/noticias/${id}`)
  return res.json()
}


