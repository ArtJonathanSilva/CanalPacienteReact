import React, { useState } from 'react'
import ConsultasTable from './ConsultasTable'

import { usePaciente } from '../../../contexts/PacienteContext'

// Jonathan-Notas: 10/04 — tabela de consultas com atualização sob demanda
// reaproveitando a mesma lógica centralizada do contexto.
export default function ConsultasPage() {
  const { dados, atualizarConsultas } = usePaciente()
  const { consultas } = dados
  const [carregando, setCarregando] = useState(false)

  const handleAtualizar = async () => {
    setCarregando(true)
    await atualizarConsultas()
    setCarregando(false)
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Consultas</h2>
        <button className="btn-primary" type="button" onClick={handleAtualizar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>
      {consultas && consultas.length > 0 ? (
        <ConsultasTable consultas={consultas} />
      ) : (
        <p className="muted">Não há consultas disponíveis.</p>
      )}
    </div>
  )
}

