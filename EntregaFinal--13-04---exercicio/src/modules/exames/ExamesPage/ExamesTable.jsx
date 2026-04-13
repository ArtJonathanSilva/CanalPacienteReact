import React from 'react'

export default function ExamesTable(props) {
  const { exames } = props

  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Data</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {exames.map((exame) => (
          <tr key={exame.id}>
            <td>{exame.tipo}</td>
            <td>{new Date(exame.data).toLocaleDateString('pt-BR')}</td>
            <td>{exame.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

