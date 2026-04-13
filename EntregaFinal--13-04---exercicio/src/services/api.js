import axios from 'axios'

// Jonathan-Notas: Service Pattern — centraliza chamadas HTTP e tira essa responsabilidade da UI.
// Motivo: componentes focam em renderizar; service foca em comunicação com backend.
const api = axios.create({
  // Jonathan-Notas: VITE_ é obrigatório no Vite para expor variável ao front-end.
  // Jonathan-Notas: fallback proposital para evitar “quebrar” o projeto quando o .env não existe
  // (ex.: aluno clonou o repo e ainda não criou o .env local).
  baseURL: import.meta.env.VITE_API_URL || 'https://portal-unimed-fake-api.onrender.com',
})

export async function get(endpoint) {
  const response = await api.get(endpoint)
  return response.data
}

export async function post(endpoint, data) {
  const response = await api.post(endpoint, data)
  return response.data
}

export async function patch(endpoint, data) {
  const response = await api.patch(endpoint, data)
  return response.data
}

