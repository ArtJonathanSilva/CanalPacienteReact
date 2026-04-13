import React from 'react'

// Jonathan-Notas: Header da tela de login.
// Recebe dados via props para desacoplar conteúdo da marcação.
export default function LoginHeader(props) {
  const { icon, title, subtitle } = props

  return (
    <header className="login-header">
      <span className="login-header__icon">{icon}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}

