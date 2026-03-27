import React from 'react'

// Jonathan-Notas: loading simples para melhorar UX enquanto os dados são buscados no useEffect.
export default function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" />
      <p>Carregando...</p>
    </div>
  )
}

