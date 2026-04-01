import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

// Jonathan-Notas: MainLayout mantém a Navbar fixa e usa Outlet para renderizar as páginas “filhas”.
export default function MainLayout(props) {
  const { paciente, setPaciente } = props

  return (
    <>
      <Navbar paciente={paciente} setPaciente={setPaciente} />
      <main>
        <Outlet />
      </main>
    </>
  )
}

