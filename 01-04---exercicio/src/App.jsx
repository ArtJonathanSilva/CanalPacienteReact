import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from './modules/auth/LoginPage'
import MainLayout from './components/MainLayout'
import DashboardPage from './modules/dashboard/DashboardPage'
import ConsultasPage from './modules/consultas/ConsultasPage'
import ExamesPage from './modules/exames/ExamesPage'
import AgendamentoPage from './modules/agendamento/AgendamentoPage'

// Jonathan-Notas: 27/03 — agora o App controla “qual tela aparece” usando estado.
// Antes: a troca de tela era feita via DOM (style.display) dentro de initPortal().
// Agora: fazemos do jeito idiomático do React: renderização condicional baseada no estado.
export default function App() {
  const [paciente, setPaciente] = useState(null)

  // Jonathan-Notas: dados centralizados no componente pai para manter consistência de texto/branding.
  const loginPageData = {
    header: {
      icon: '🏥',
      title: 'Portal do Paciente',
      subtitle: 'Unimed',
    },
    form: {
      carteirinhaLabel: 'Carteirinha',
      senhaLabel: 'Senha',
      submitText: 'Entrar',
    },
    hint: {
      carteirinha: '0089234000012',
      senha: '123456',
    },
  }

  // Jonathan-Notas: 01/04 — em vez de trocar de tela com if/else, usamos rotas.
  // Navigate serve para redirecionar (ex.: / -> /login ou /dashboard).
  // Proteção simples: se não tiver paciente, bloqueia rotas privadas e manda pro /login.
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={paciente ? <Navigate to="/dashboard" replace /> : <LoginPage data={loginPageData} setPaciente={setPaciente} />}
        />

        <Route path="/" element={<Navigate to={paciente ? '/dashboard' : '/login'} replace />} />

        <Route element={paciente ? <MainLayout paciente={paciente} setPaciente={setPaciente} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={<DashboardPage paciente={paciente} />} />
          <Route path="/consultas" element={<ConsultasPage />} />
          <Route path="/exames" element={<ExamesPage />} />
          <Route path="/agendamento" element={<AgendamentoPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

