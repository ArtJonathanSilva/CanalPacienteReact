import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Jonathan-Notas: cria a "raiz" React e renderiza o componente App dentro do #app.
// Antes: com TypeScript, a entrada era main.ts. Agora usamos main.jsx para ficar alinhado com JSX puro.
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

