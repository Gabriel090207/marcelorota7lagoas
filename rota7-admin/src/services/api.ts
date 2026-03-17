export const API_URL = import.meta.env.VITE_API_URL

export const getNoticias = async () => {
  const res = await fetch(`${API_URL}/noticias`)
  return res.json()
}

export const getNoticiaById = async (id: string) => {
  const res = await fetch(`${API_URL}/noticias/${id}`)
  return res.json()
}

export const createNoticia = async (data: any) => {
  const res = await fetch(`${API_URL}/noticias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const updateNoticia = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/noticias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}