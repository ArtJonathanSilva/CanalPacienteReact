import React, { useState } from 'react'
import ExamesTable from './ExamesTable'

import { usePaciente } from '../../../contexts/PacienteContext'

// Jonathan-Notas: 10/04 — agora a página usa os dados centralizados no contexto
// e permite atualizar exames sem novo login.
export default function ExamesPage() {
  const { dados, atualizarExames } = usePaciente()
  const { exames } = dados
  const [carregando, setCarregando] = useState(false)

  const handleAtualizar = async () => {
    setCarregando(true)
    await atualizarExames()
    setCarregando(false)
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Exames</h2>
        <button className="btn-primary" type="button" onClick={handleAtualizar} disabled={carregando}>
          {carregando ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>
      {exames && exames.length > 0 ? <ExamesTable exames={exames} /> : <p className="muted">Não há exames disponíveis.</p>}
    </div>
  )
}

