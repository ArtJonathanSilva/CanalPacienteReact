import React from 'react'

// Jonathan-Notas: List representa a área de cards (pode virar um map() no futuro).
export default function ConsultaList(props) {
  const { listId, placeholder } = props

  return (
    <div className="consultas-list" id={listId}>
      {placeholder}
    </div>
  )
}

