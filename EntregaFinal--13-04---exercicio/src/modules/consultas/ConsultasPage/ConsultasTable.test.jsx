import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ConsultasTable from './ConsultasTable'

const consultasMock = [
  {
    id: 1,
    data: '2026-04-10T09:00:00',
    medico: 'Dr. João Silva',
    especialidade: 'Cardiologia',
    status: 'Confirmada',
    local: 'Clínica Central',
  },
  {
    id: 2,
    data: '2026-04-15T14:30:00',
    medico: 'Dra. Maria Souza',
    especialidade: 'Dermatologia',
    status: 'Pendente',
    local: 'Unidade Norte',
  },
]

describe('ConsultasTable', () => {
  it('deve renderizar os cabeçalhos da tabela', () => {
    render(<ConsultasTable consultas={[]} />)

    expect(screen.getByText('Médico')).toBeInTheDocument()
    expect(screen.getByText('Especialidade')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('deve renderizar uma linha para cada consulta', () => {
    render(<ConsultasTable consultas={consultasMock} />)

    const linhas = screen.getAllByRole('row')
    expect(linhas).toHaveLength(consultasMock.length + 1)
  })

  it('deve exibir os dados da primeira consulta corretamente', () => {
    render(<ConsultasTable consultas={consultasMock} />)

    expect(screen.getByText('Dr. João Silva')).toBeInTheDocument()
    expect(screen.getByText('Cardiologia')).toBeInTheDocument()
    expect(screen.getByText('10/04/2026')).toBeInTheDocument()
  })

  it('não deve renderizar linhas no corpo quando não há consultas', () => {
    render(<ConsultasTable consultas={[]} />)

    const tbody = screen.getByRole('table').querySelector('tbody')
    expect(tbody).toBeEmptyDOMElement()
  })
})
