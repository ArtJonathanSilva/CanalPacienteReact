import React from 'react'

// Jonathan-Notas: List foi extraído para representar a área de cards.
// Os cards continuam sendo inseridos dinamicamente pelo arquivo portal/app.js.
export default function ConsultaList(props) {
  const { listId, placeholder } = props

  return (
    <div className="consultas-list" id={listId}>
      {placeholder}
    </div>
  )
}

