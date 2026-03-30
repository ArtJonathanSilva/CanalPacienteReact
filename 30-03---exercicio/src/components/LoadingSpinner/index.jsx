import React from 'react'

// Jonathan-Notas: Componente reutilizável (shared).
// Motivo: estado de carregamento (loading) aparece em várias páginas.
export default function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" />
      <p>Carregando...</p>
    </div>
  )
}

