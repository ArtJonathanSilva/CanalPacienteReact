import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const NAV_LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/consultas', label: 'Consultas' },
  { to: '/exames', label: 'Exames' },
  { to: '/agendamento', label: 'Agendamento' },
]

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')

export default function Navbar(props) {
  const { paciente, setPaciente } = props

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-icon">🩺</span>
        <span className="navbar-brand-name">Portal do Paciente</span>
      </div>

      <nav className="navbar-nav">
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-actions">
        <button className="navbar-bell" type="button" title="Notificações">
          🔔
        </button>
        <span className="navbar-user">{paciente?.nome}</span>
        <button className="navbar-logout" type="button" onClick={() => setPaciente(null)}>
          Sair
        </button>
      </div>
    </header>
  )
}

