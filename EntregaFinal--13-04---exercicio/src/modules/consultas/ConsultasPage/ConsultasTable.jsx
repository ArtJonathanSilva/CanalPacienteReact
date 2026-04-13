import React from 'react'

export default function ConsultasTable(props) {
  const { consultas } = props

  return (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Hora</th>
          <th>Médico</th>
          <th>Especialidade</th>
          <th>Status</th>
          <th>Local</th>
        </tr>
      </thead>
      <tbody>
        {consultas.map((consulta) => {
          const dataObj = new Date(consulta.data)
          return (
            <tr key={consulta.id}>
              <td>{dataObj.toLocaleDateString('pt-BR')}</td>
              <td>{dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
              <td>{consulta.medico}</td>
              <td>{consulta.especialidade}</td>
              <td>{consulta.status}</td>
              <td>{consulta.local}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

