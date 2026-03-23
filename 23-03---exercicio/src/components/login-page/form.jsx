import React from 'react'

// Jonathan-Notas: Form separado para facilitar manutenção e reaproveitamento.
// IDs e classes foram preservados para manter compatibilidade com initPortal() (DOM + axios).
export default function LoginForm(props) {
  const { carteirinhaLabel, senhaLabel, submitText } = props

  return (
    <form className="login-form" id="login-form">
      <div className="form-group">
        <label htmlFor="carteirinha">{carteirinhaLabel}</label>
        <input type="text" id="carteirinha" placeholder="Digite sua carteirinha" />
        <span className="error-message" id="carteirinha-error" />
      </div>

      <div className="form-group">
        <label htmlFor="senha">{senhaLabel}</label>
        <input type="password" id="senha" placeholder="Digite sua senha" />
        <span className="error-message" id="senha-error" />
      </div>

      <div className="error-message" id="login-error" />

      <button type="submit" className="btn-primary">
        {submitText}
      </button>
    </form>
  )
}

