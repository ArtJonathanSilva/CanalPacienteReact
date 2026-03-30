import React from 'react'
import './style.css'

import LoginHeader from '../../components/login-page/header'
import LoginForm from '../../components/login-page/form'
import LoginHint from '../../components/login-page/hint'

// Jonathan-Notas: 30/03 — LoginPage agora é uma “página” do módulo auth.
// O CSS específico do módulo é importado aqui (co-locação de estilo + componente).
export default function LoginPage(props) {
  const { data, setPaciente } = props
  const { header, form, hint } = data

  return (
    <main className="login-page">
      <div className="login-card">
        <LoginHeader icon={header.icon} title={header.title} subtitle={header.subtitle} />
        <LoginForm setPaciente={setPaciente} carteirinhaLabel={form.carteirinhaLabel} senhaLabel={form.senhaLabel} submitText={form.submitText} />
        <LoginHint carteirinha={hint.carteirinha} senha={hint.senha} />
      </div>
    </main>
  )
}

