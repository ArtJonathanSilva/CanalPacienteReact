import React from 'react'
import './style.css'

import LoginHeader from './Header'
import LoginForm from './Form'
import LoginHint from './Hint'

// Jonathan-Notas: 30/03 — LoginPage como “página” do módulo auth.
// Padrão de pastas: cada página em uma pasta com index.jsx + style.css (co-locação).
export default function LoginPage(props) {
  const { data, setPaciente } = props
  const { header, form, hint } = data

  return (
    <main className="login-page">
      <div className="login-card">
        <LoginHeader icon={header.icon} title={header.title} subtitle={header.subtitle} />
        <LoginForm
          setPaciente={setPaciente}
          carteirinhaLabel={form.carteirinhaLabel}
          senhaLabel={form.senhaLabel}
          submitText={form.submitText}
        />
        <LoginHint carteirinha={hint.carteirinha} senha={hint.senha} />
      </div>
    </main>
  )
}

