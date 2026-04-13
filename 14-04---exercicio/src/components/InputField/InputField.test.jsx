import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from './index'

describe('InputField', () => {
  const defaultProps = {
    id: 'email',
    type: 'email',
    placeholder: 'Digite seu e-mail',
    label: 'E-mail',
    value: '',
    onChange: vi.fn(),
  }

  it('deve renderizar o label com o texto correto', () => {
    render(<InputField {...defaultProps} />)
    expect(screen.getByText('E-mail')).toBeInTheDocument()
  })

  it('deve renderizar o input com o placeholder correto', () => {
    render(<InputField {...defaultProps} />)
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
  })

  it('deve renderizar o input com o type correto', () => {
    render(<InputField {...defaultProps} />)
    const input = screen.getByPlaceholderText('Digite seu e-mail')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('deve chamar onChange quando o usuário digita', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<InputField {...defaultProps} onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Digite seu e-mail')
    await user.type(input, 'teste@email.com')

    expect(handleChange).toHaveBeenCalled()
  })

  it('deve exibir o valor passado via prop', () => {
    render(<InputField {...defaultProps} value="valor-inicial" />)
    const input = screen.getByDisplayValue('valor-inicial')
    expect(input).toBeInTheDocument()
  })
})
