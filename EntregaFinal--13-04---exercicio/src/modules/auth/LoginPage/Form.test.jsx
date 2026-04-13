import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './Form'
import { PacienteProvider } from '../../../contexts/PacienteContext'
import * as PacienteContextModule from '../../../contexts/PacienteContext'

function renderWithProvider(ui) {
  return render(<PacienteProvider>{ui}</PacienteProvider>)
}

const defaultProps = {
  carteirinhaLabel: 'Carteirinha',
  senhaLabel: 'Senha',
  submitText: 'Entrar',
}

describe('LoginForm', () => {
  it('deve renderizar os campos de carteirinha e senha', () => {
    renderWithProvider(<LoginForm {...defaultProps} />)

    expect(screen.getByPlaceholderText('Digite sua carteirinha')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
  })

  it('deve renderizar o botão "Entrar"', () => {
    renderWithProvider(<LoginForm {...defaultProps} />)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('deve atualizar os campos ao digitar', async () => {
    const user = userEvent.setup()
    renderWithProvider(<LoginForm {...defaultProps} />)

    const campoCarteirinha = screen.getByPlaceholderText('Digite sua carteirinha')
    await user.type(campoCarteirinha, '0089234000012')

    expect(campoCarteirinha).toHaveValue('0089234000012')
  })

  it('não deve exibir mensagem de erro no estado inicial', () => {
    renderWithProvider(<LoginForm {...defaultProps} />)
    expect(screen.queryByText('Falha no login. Verifique suas credenciais e tente novamente.')).not.toBeInTheDocument()
  })
})

describe('LoginForm — cenário de erro', () => {
  it('deve exibir mensagem de erro quando o login falha', async () => {
    vi.spyOn(PacienteContextModule, 'usePaciente').mockReturnValue({
      login: vi.fn(),
      error: 'Falha no login. Verifique suas credenciais e tente novamente.',
    })

    const user = userEvent.setup()
    render(<LoginForm {...defaultProps} />)

    const botao = screen.getByRole('button', { name: /entrar/i })
    await user.click(botao)

    expect(screen.getByText('Falha no login. Verifique suas credenciais e tente novamente.')).toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
