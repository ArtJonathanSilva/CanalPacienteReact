import React from 'react'
import ConsultaList from './list'

// Jonathan-Notas: Content centraliza título/contador e delega a lista.
// Com isso, cada componente tem responsabilidade única.
export default function ConsultaContent(props) {
  const { title, countId, listId, placeholder } = props

  return (
    <main className="main-content">
      <div className="page-header">
        <h2>{title}</h2>
        <p id={countId} />
      </div>

      <ConsultaList listId={listId} placeholder={placeholder} />
    </main>
  )
}

