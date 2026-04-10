import React, { forwardRef, memo } from 'react'

// Jonathan-Notas: Componente reutilizável (shared).
// Motivo: campos de formulário aparecem em vários módulos (auth, consultas, etc).
// Padrão: export default + index.jsx para facilitar imports curtos.
const InputField = memo(
  forwardRef(function InputField(props, ref) {
  const { id, type, placeholder, label, value, onChange } = props

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input ref={ref} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} />
      <span className="error-message"></span>
    </div>
  )
  })
)

export default InputField

