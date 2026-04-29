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
  const res = await fetch(`${API_URL}/parceiros`)
  return res.json()
}

export async function createParceiro(data: any) {
  const res = await fetch(`${API_URL}/parceiros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function updateParceiro(id: string, data: any) {
  const res = await fetch(`${API_URL}/parceiros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function deleteParceiro(id: string) {
  const res = await fetch(`${API_URL}/parceiros/${id}`, {
    method: "DELETE"
  })

  return res.json()
}



// GRUPOS

export async function getGrupos() {
  const res = await fetch(`${API_URL}/grupos`)
  return res.json()
}

export async function getGrupoById(id: string) {
  const res = await fetch(`${API_URL}/grupos/${id}`)
  return res.json()
}

export async function createGrupo(data: any) {
  const res = await fetch(`${API_URL}/grupos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function updateGrupo(id: string, data: any) {
  const res = await fetch(`${API_URL}/grupos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function deleteGrupo(id: string) {
  const res = await fetch(`${API_URL}/grupos/${id}`, {
    method: "DELETE"
  })

  return res.json()
}


// ANÚNCIOS

export async function getAnuncios() {
  const res = await fetch(`${API_URL}/anuncios`)
  return res.json()
}

export async function getAnuncioById(id: string) {
  const res = await fetch(`${API_URL}/anuncios/${id}`)
  return res.json()
}

export async function createAnuncio(data: any) {
  const res = await fetch(`${API_URL}/anuncios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function updateAnuncio(id: string, data: any) {
  const res = await fetch(`${API_URL}/anuncios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function deleteAnuncio(id: string) {
  const res = await fetch(`${API_URL}/anuncios/${id}`, {
    method: "DELETE"
  })

  return res.json()
}



// =======================
// GALERIA
// =======================

export async function createImagem(data: any) {
  const res = await fetch(`${API_URL}/galeria`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function getImagens() {
  const res = await fetch(`${API_URL}/galeria`)
  return res.json()
}

export async function deleteImagem(id: string) {
  const res = await fetch(`${API_URL}/galeria/${id}`, {
    method: "DELETE"
  })

  return res.json()
}



// BLOGS

export const getBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`)
  return res.json()
}

export const getBlogById = async (id: string) => {
  const res = await fetch(`${API_URL}/blogs/${id}`)
  return res.json()
}

export const createBlog = async (data: any) => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const updateBlog = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE"
  })

  return res.json()
}


// 🔥 USUÁRIOS
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/auth/users`)
  return res.json()
}

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/auth/users/${id}`, {
    method: "DELETE"
  })

  return res.json()
}


// =======================
// COMENTÁRIOS ADMIN
// =======================

export const getComentariosPendentes = async () => {
  const res = await fetch(`${API_URL}/comentarios`)
  return res.json()
}

export const aprovarComentario = async (id: string) => {
  const res = await fetch(`${API_URL}/comentarios/${id}/aprovar`, {
    method: "PUT"
  })

  return res.json()
}

export const rejeitarComentario = async (id: string) => {
  const res = await fetch(`${API_URL}/comentarios/${id}/rejeitar`, {
    method: "PUT"
  })

  return res.json()
}