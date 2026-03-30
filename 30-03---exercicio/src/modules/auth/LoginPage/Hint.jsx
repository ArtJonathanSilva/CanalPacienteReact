import React from 'react'

// Jonathan-Notas: Hint também recebe conteúdo por props.
// Isso permite trocar credenciais de estudo sem editar o layout.
export default function LoginHint(props) {
  const { carteirinha, senha } = props

  return (
    <p className="login-hint">
      Carteirinha: <strong>{carteirinha}</strong> | Senha: <strong>{senha}</strong>
    </p>
  )
}

