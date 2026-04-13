import React from 'react'
import ConsultaList from './List'

// Jonathan-Notas: Content centraliza título/contador e delega a lista.
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

