import axios from 'axios'

// Jonathan-Notas: Service Pattern — centraliza chamadas HTTP e tira essa responsabilidade da UI.
// Motivo: componentes focam em renderizar; service foca em comunicação com backend.
const api = axios.create({
  // Jonathan-Notas: VITE_ é obrigatório no Vite para expor variável ao front-end.
  baseURL: import.meta.env.VITE_API_URL,
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

