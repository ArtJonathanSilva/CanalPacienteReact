import React from 'react'
import LoginHeader from './header'
import LoginForm from './form'
import LoginHint from './hint'

// Jonathan-Notas: Página de Login composta por Header + Form + Hint.
// Estratégia: o componente pai recebe "data" e distribui para componentes menores por props.
export default function LoginPage(props) {
  // Jonathan-Notas: prop drilling (27/03) — recebemos setPaciente do App e passamos adiante.
  // Isso “caiu” mais de um nível (App -> LoginPage -> LoginForm).
  const { data, setPaciente } = props
  const { header, form, hint } = data

  return (
    <main className="login-page" id="login-page">
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

