import React, { useEffect } from 'react'
import { initPortal } from './portal/app'

// Jonathan-Notas: este componente React renderiza o HTML da aula (login + container de consultas).
// A lógica de autenticar e renderizar os cards continua em src/portal/app.js (DOM + axios).
export default function App() {
  useEffect(() => {
    const cleanup = initPortal()
    return () => cleanup && cleanup()
  }, [])

  return (
    <>
      <main className="login-page" id="login-page">
        <div className="login-card">
          <header className="login-header">
            <span className="login-header__icon">🏥</span>
            <h1>Portal do Paciente</h1>
            <p>Unimed</p>
          </header>

          <form className="login-form" id="login-form">
            <div className="form-group">
              <label htmlFor="carteirinha">Carteirinha</label>
              <input type="text" id="carteirinha" placeholder="Digite sua carteirinha" />
              <span className="error-message" id="carteirinha-error" />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="Digite sua senha" />
              <span className="error-message" id="senha-error" />
            </div>

            <div className="error-message" id="login-error" />

            <button type="submit" className="btn-primary">
              Entrar
            </button>
          </form>

          <p className="login-hint">
            Carteirinha: <strong>0089234000012</strong> | Senha: <strong>123456</strong>
          </p>
        </div>
      </main>

      <div className="app-container" id="app-container" style={{ display: 'none' }}>
        <header className="header">
          <div className="header__logo">
            <span>🏥</span>
            <h1>Portal do Paciente</h1>
          </div>

          <div className="header__user">
            <span id="user-name">Paciente</span>
            <button className="btn-logout" id="btn-logout" type="button">
              Sair
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="page-header">
            <h2>Minhas Consultas</h2>
            <p id="consultas-count" />
          </div>

          <div className="consultas-list" id="consultas-list">{/* Cards serão inseridos via JS */}</div>
        </main>
      </div>
    </>
  )
}

