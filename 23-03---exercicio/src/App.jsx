import React, { useEffect } from 'react'
import { initPortal } from './portal/app'
import LoginPage from './components/login-page/login-page'
import ConsultaPage from './components/consulta-page/consulta-page'

// Jonathan-Notas: este componente React renderiza o HTML da aula (login + container de consultas).
// A lógica de autenticar e renderizar os cards continua em src/portal/app.js (DOM + axios).
export default function App() {
  useEffect(() => {
    const cleanup = initPortal()
    return () => cleanup && cleanup()
  }, [])

  // Jonathan-Notas: dados centralizados no componente pai.
  // Assim, os componentes filhos ficam "burros" (presentacionais) e reutilizáveis.
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

  // Jonathan-Notas: para manter compatibilidade com initPortal(), preservamos os IDs
  // que ele usa (#user-name, #consultas-count, #consultas-list e #btn-logout).
  const consultaPageData = {
    header: {
      icon: '🏥',
      title: 'Portal do Paciente',
      userName: 'Paciente',
      logoutText: 'Sair',
    },
    content: {
      title: 'Minhas Consultas',
      countId: 'consultas-count',
      listId: 'consultas-list',
      placeholder: null,
    },
  }

  return (
    <>
      <LoginPage data={loginPageData} />
      <ConsultaPage data={consultaPageData} />
    </>
  )
}

