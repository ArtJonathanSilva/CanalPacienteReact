import React, { useMemo } from 'react'
import './style.css'

import LoadingSpinner from '../../../components/LoadingSpinner'

import { usePaciente } from '../../../contexts/PacienteContext'

// Jonathan-Notas: 30/03 — DashboardPage como “página” do módulo dashboard.
// Ele usa services/api.js e lê baseURL do .env via import.meta.env.
export default function DashboardPage() {
  const { dados } = usePaciente()
  const { paciente, exames, consultas } = dados

  const examesResumo = useMemo(() => {
    const resultados = exames.filter((e) => e.status === 'resultado_disponivel').length
    const aguardando = exames.filter((e) => e.status === 'aguardando_resultado').length
    return { resultados, aguardando }
  }, [exames])

  const consultasRecentes = useMemo(() => {
    return (consultas || [])
      .filter((c) => c.status !== 'cancelada')
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 3)
  }, [consultas])

  const estatisticas = useMemo(() => {
    return {
      totalExames: exames.length,
      examesPendentes: exames.filter((e) => e.status === 'aguardando_resultado').length,
      totalConsultas: consultas.length,
    }
  }, [exames, consultas])

  if (!paciente || !exames.length || !consultas.length) return <LoadingSpinner />

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="page-header">
          <h2>Olá, {paciente.nome?.split(' ')[0] || 'Paciente'}!</h2>
          <p>Aqui está um resumo das suas informações</p>
        </div>
        <section className="panel panel--wide">
          <h3>Resumo</h3>
          <div className="panel__rows">
            <div>
              <strong>Total de consultas:</strong> {estatisticas.totalConsultas}
            </div>
            <div>
              <strong>Total de exames:</strong> {estatisticas.totalExames}
            </div>
            <div>
              <strong>Exames pendentes:</strong> {estatisticas.examesPendentes}
            </div>
          </div>
        </section>

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

