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



export const deleteNoticia = async (id: string) => {
  const res = await fetch(`${API_URL}/noticias/${id}`, {
    method: "DELETE"
  })

  return res.json()
}





// DICAS
export const getDicas = async () => {
  const res = await fetch(`${API_URL}/dicas`)
  return res.json()
}

export const getDicaById = async (id: string) => {
  const res = await fetch(`${API_URL}/dicas/${id}`)
  return res.json()
}

export const createDica = async (data: any) => {
  const res = await fetch(`${API_URL}/dicas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const updateDica = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/dicas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const deleteDica = async (id: string) => {
  const res = await fetch(`${API_URL}/dicas/${id}`, {
    method: "DELETE"
  })

  return res.json()
}





// EVENTOS

export const getEventos = async () => {
  const res = await fetch(`${API_URL}/eventos`)
  return res.json()
}

export const getEventoById = async (id: string) => {
  const res = await fetch(`${API_URL}/eventos/${id}`)
  return res.json()
}

export const createEvento = async (data: any) => {
  const res = await fetch(`${API_URL}/eventos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const updateEvento = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/eventos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const deleteEvento = async (id: string) => {
  const res = await fetch(`${API_URL}/eventos/${id}`, {
    method: "DELETE"
  })

  return res.json()
}



// 🔥 PARCEIROS

export async function getParceiros() {
  const res = await fetch("/api/parceiros")
  return res.json()
}

export async function createParceiro(data: any) {
  const res = await fetch("/api/parceiros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateParceiro(id: string, data: any) {
  const res = await fetch(`/api/parceiros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteParceiro(id: string) {
  await fetch(`/api/parceiros/${id}`, {
    method: "DELETE"
  })
}