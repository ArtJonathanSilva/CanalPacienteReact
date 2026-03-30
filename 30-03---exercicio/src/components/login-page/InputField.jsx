import React from 'react'

// Jonathan-Notas: InputField é um componente reaproveitável para inputs do formulário.
// Motivo: evitar duplicação do "form-group" (label + input + espaço de erro).
// Como funciona: recebe tudo por props (id, type, placeholder, label, value, onChange),
// e o LoginForm controla o estado (lifting state up).
export default function InputField(props) {
  const { id, type, placeholder, label, value, onChange } = props

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      <span className="error-message"></span>
    </div>
  )
}

