import React, { createContext, useCallback, useContext, useState } from 'react'

import { get, post } from '../services/api'

// Jonathan-Notas: 08/04 — Custom Hooks + Context “inteligente”.
// Agora este arquivo tem 3 responsabilidades:
// 1) Contexto (interno, não exportamos diretamente)
// 2) PacienteProvider: encapsula estado + regras de autenticação
// 3) usePaciente: custom hook para acessar com segurança (evita prop drilling)
const PacienteContext = createContext(null)
const dadosIniciais = {
  paciente: null,
  exames: [],
  consultas: [],
}

export function PacienteProvider(props) {
  const { children } = props

  const [dados, setDados] = useState(dadosIniciais)
  const [error, setError] = useState(null)

  const login = useCallback(async (carteirinha, senha) => {
    setError(null)
    try {
      const paciente = await post('/login', { carteirinha, senha })
      const [exames, consultas] = await Promise.all([
        get(`/exames?pacienteId=${paciente.id}`),
        get(`/consultas?pacienteId=${paciente.id}`),
      ])
      setDados({ paciente, exames, consultas })
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.')
    }
  }, [])

  const logout = useCallback(() => {
    setDados(dadosIniciais)
  }, [])

  const atualizarExames = useCallback(async () => {
    if (!dados.paciente?.id) return
    const exames = await get(`/exames?pacienteId=${dados.paciente.id}`)
    setDados((prev) => ({ ...prev, exames }))
  }, [dados.paciente?.id])

  const atualizarConsultas = useCallback(async () => {
    if (!dados.paciente?.id) return
    const consultas = await get(`/consultas?pacienteId=${dados.paciente.id}`)
    setDados((prev) => ({ ...prev, consultas }))
  }, [dados.paciente?.id])

  return (
    <PacienteContext.Provider value={{ dados, login, logout, error, atualizarExames, atualizarConsultas }}>
      {children}
    </PacienteContext.Provider>
  )
}

export function usePaciente() {
  const context = useContext(PacienteContext)
  if (!context) {
    throw new Error('usePaciente deve ser usado dentro de um PacienteProvider')
  }
  return context
}

