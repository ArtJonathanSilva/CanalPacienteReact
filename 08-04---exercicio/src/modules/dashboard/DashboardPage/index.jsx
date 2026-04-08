import React, { useEffect, useMemo, useState } from 'react'
import './style.css'

import LoadingSpinner from '../../../components/LoadingSpinner'
import { get } from '../../../services/api'

import { usePaciente } from '../../../contexts/PacienteContext'

// Jonathan-Notas: 30/03 — DashboardPage como “página” do módulo dashboard.
// Ele usa services/api.js e lê baseURL do .env via import.meta.env.
export default function DashboardPage() {
  const { paciente } = usePaciente()

  const [exames, setExames] = useState([])
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examesData, consultasData] = await Promise.all([
          get(`/exames?pacienteId=${paciente.id}`),
          get(`/consultas?pacienteId=${paciente.id}`),
        ])

        setExames(examesData)
        setConsultas(consultasData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [paciente.id])

  const examesResumo = useMemo(() => {
    const resultados = exames.filter((e) => e.status === 'resultado_disponivel').length
    const aguardando = exames.filter((e) => e.status === 'aguardando_resultado').length
    return { resultados, aguardando }
  }, [exames])

  const consultasRecentes = useMemo(() => (consultas || []).slice(0, 3), [consultas])

  if (loading) return <LoadingSpinner />

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="page-header">
          <h2>Olá, {paciente.nome?.split(' ')[0] || 'Paciente'}!</h2>
          <p>Aqui está um resumo das suas informações</p>
        </div>

        <section className="dashboard-grid">
          <div className="panel panel--wide">
            <h3>Dados do Plano</h3>
            <div className="panel__rows">
              <div>
                <strong>Plano:</strong> {paciente.plano || '—'}
              </div>
              <div>
                <strong>Carteirinha:</strong> {paciente.carteirinha || '—'}
              </div>
              <div>
                <strong>Email:</strong> {paciente.email || '—'}
              </div>
              <div>
                <strong>Telefone:</strong> {paciente.telefone || '—'}
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Próxima Consulta</h3>
            {consultas.length ? (
              <div className="panel__rows">
                <div>
                  <strong>{consultas[0].especialidade}</strong>
                </div>
                <div>{consultas[0].medico}</div>
                <div>{new Date(consultas[0].data).toLocaleString('pt-BR')}</div>
                <div className="muted">{consultas[0].local}</div>
              </div>
            ) : (
              <p className="muted">Nenhuma consulta encontrada.</p>
            )}
          </div>

          <div className="panel">
            <h3>Exames</h3>
            <div className="exames-resumo">
              <div className="exames-resumo__item">
                <div className="exames-resumo__value">{examesResumo.resultados}</div>
                <div className="muted">Resultados disponíveis</div>
              </div>
              <div className="exames-resumo__item">
                <div className="exames-resumo__value">{examesResumo.aguardando}</div>
                <div className="muted">Aguardando resultado</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Agendar Consulta</h3>
            <p className="muted">Clique para agendar uma nova consulta</p>
          </div>

          {consultasRecentes.length > 0 && (
            <div className="panel panel--wide">
              <h3>Consultas Recentes</h3>
              <div className="recent-list">
                {consultasRecentes.map((consulta) => (
                  <div className="recent-item" key={consulta.id}>
                    <div>
                      <strong>{consulta.especialidade}</strong>
                      <span> — {consulta.medico}</span>
                    </div>
                    <div className="recent-item__right">
                      <span className="muted">{new Date(consulta.data).toLocaleString('pt-BR')}</span>
                      <span className={`status-badge status-badge--${consulta.status}`}>{consulta.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

