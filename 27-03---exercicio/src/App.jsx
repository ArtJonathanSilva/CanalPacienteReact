import React, { useState } from 'react'
import LoginPage from './components/login-page/login-page'
import DashboardPage from './components/dashboard-page/DashboardPage'

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

  // Jonathan-Notas: renderização condicional — se não tem paciente, fica no login.
  // Quando LoginForm chama setPaciente(response.data), o App re-renderiza e mostra o dashboard.
  if (!paciente) {
    return <LoginPage data={loginPageData} setPaciente={setPaciente} />
  }

  return <DashboardPage paciente={paciente} onLogout={() => setPaciente(null)} />
}

