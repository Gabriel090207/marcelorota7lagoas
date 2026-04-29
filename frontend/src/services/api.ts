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

export const getNoticiaBySlug = async (slug: string) => {
  const res = await fetch(`${API_URL}/noticias/${slug}`)
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

export const getDicaBySlug = async (slug: string) => {
  const res = await fetch(`${API_URL}/dicas/${slug}`)
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


 // =======================
// GALERIA
// =======================

export const getImagens = async () => {
  const res = await fetch(`${API_URL}/galeria`)
  return res.json()
}


// =======================
// ANÚNCIOS
// =======================

export const getAnuncios = async () => {
  const res = await fetch(`${API_URL}/anuncios`)
  return res.json()
}


// =======================
// BLOGS
// =======================

export const getBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`)
  return res.json()
}

export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${API_URL}/blogs/${slug}`)
  return res.json()
}



// =======================
// AUTH
// =======================

export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const loginUser = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}



// =======================
// COMENTÁRIOS
// =======================

export const getComentariosByBlog = async (blogId: string) => {
  const res = await fetch(`${API_URL}/comentarios/${blogId}`)
  return res.json()
}

export const createComentario = async (data: any) => {
  const res = await fetch(`${API_URL}/comentarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}