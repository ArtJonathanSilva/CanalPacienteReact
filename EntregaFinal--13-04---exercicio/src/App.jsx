import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from './modules/auth/LoginPage'
import MainLayout from './components/MainLayout'
import DashboardPage from './modules/dashboard/DashboardPage'
import ConsultasPage from './modules/consultas/ConsultasPage'
import ExamesPage from './modules/exames/ExamesPage'
import AgendamentoPage from './modules/agendamento/AgendamentoPage'

import { PacienteProvider, usePaciente } from './contexts/PacienteContext'

// Jonathan-Notas: 27/03 — agora o App controla “qual tela aparece” usando estado.
// Antes: a troca de tela era feita via DOM (style.display) dentro de initPortal().
// Agora: fazemos do jeito idiomático do React: renderização condicional baseada no estado.
function AppRoutes() {
  const { dados } = usePaciente()
  const { paciente } = dados

  // Jonathan-Notas: dados centralizados para manter consistência de texto/branding.
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

  return (
    <Routes>
      <Route path="/login" element={!paciente ? <LoginPage data={loginPageData} /> : <Navigate to="/" replace />} />

      <Route path="/" element={<Navigate to={paciente ? '/dashboard' : '/login'} replace />} />

      <Route element={paciente ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/exames" element={<ExamesPage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  // Jonathan-Notas: 08/04 — O App agora só monta Provider + Router.
  // O usePaciente() só pode ser usado dentro do Provider, por isso criamos AppRoutes separado.
  return (
    <PacienteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PacienteProvider>
  )
}

