import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Jonathan-Notas: configura o Vite para interpretar JSX com React (sem TypeScript).
export default defineConfig({
  plugins: [react()],
})

