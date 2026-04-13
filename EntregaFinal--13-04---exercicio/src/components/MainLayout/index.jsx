import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

// Jonathan-Notas: MainLayout mantém a Navbar fixa e usa Outlet para renderizar as páginas “filhas”.
export default function MainLayout(props) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

