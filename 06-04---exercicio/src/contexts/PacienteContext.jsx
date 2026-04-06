import { createContext } from 'react'

// Jonathan-Notas: 06/04 — Context API
// Motivo: evitar prop drilling do estado "paciente" (muitas páginas precisam desse dado).
const PacienteContext = createContext(null)

export default PacienteContext

