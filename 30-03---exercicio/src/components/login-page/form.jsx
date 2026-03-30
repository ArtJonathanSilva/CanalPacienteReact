import React, { useState } from 'react'
import InputField from './InputField'
import { post } from '../../services/api'

// Jonathan-Notas: Form separado para facilitar manutenção e reaproveitamento.
// IDs e classes foram preservados para manter compatibilidade com initPortal() (DOM + axios).
export default function LoginForm(props) {
  const { carteirinhaLabel, senhaLabel, submitText, setPaciente } = props

  // Jonathan-Notas: Estado (useState) guarda o valor atual dos inputs.
  // Antes: o valor ficava "preso" no DOM. Agora: o React controla (controlled inputs).
  // Benefício: o submit consegue acessar os dados sem precisar querySelector.
  const [carteirinha, setCarteirinha] = useState('')
  const [senha, setSenha] = useState('')

  // Jonathan-Notas: Renderização condicional depende de estado.
  // Se error tiver conteúdo, mostramos a mensagem. Se estiver vazio, não renderiza nada.
  const [error, setError] = useState('')

  // Jonathan-Notas: 30/03 — removemos URL hardcoded. Agora vem do .env via service (services/api.js).

  // Jonathan-Notas: Evento de submit (onSubmit) é a forma nativa do React lidar com envio do form.
  // Usamos async/await para evitar "promise hell" (cadeias longas de .then/.catch).
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await post('/login', { carteirinha, senha })
      console.log('Login successful:', data)
      // Jonathan-Notas: 27/03 — ao setar o paciente no App, o React troca de tela automaticamente
      // por renderização condicional (App: if (!paciente) ... else ...).
      // Isso substitui a abordagem antiga de "style.display" e DOM manual.
      setPaciente?.(data)
    } catch (err) {
      console.error('Login error:', err)
      setError('Falha no login. Verifique suas credenciais e tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form" id="login-form">
      <InputField
        id="carteirinha"
        type="text"
        placeholder="Digite sua carteirinha"
        label={carteirinhaLabel}
        value={carteirinha}
        onChange={(e) => setCarteirinha(e.target.value)}
      />

      <InputField
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        label={senhaLabel}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {error && (
        <div className="error-message" id="login-error">
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary">
        {submitText}
      </button>
    </form>
  )
}

