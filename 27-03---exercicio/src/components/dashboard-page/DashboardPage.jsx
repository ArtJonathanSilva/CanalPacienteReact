import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'

// Jonathan-Notas: DashboardPage é renderizado depois do login, recebendo o paciente via props.
// Aqui entra o useEffect para carregar dados assim que a tela “monta”.
export default function DashboardPage(props) {
  const { paciente, onLogout } = props

  const API_URL = 'https://portal-unimed-fake-api.onrender.com'

  const [exames, setExames] = useState([])
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Jonathan-Notas: useEffect roda após a primeira renderização.
    // Motivo: buscar dados externos (API) quando a tela for carregada.
    const fetchData = async () => {
      try {
        const [examesResponse, consultasResponse] = await Promise.all([
          axios.get(`${API_URL}/exames`, { params: { pacienteId: paciente.id } }),
          axios.get(`${API_URL}/consultas`, { params: { pacienteId: paciente.id } }),
        ])

        setExames(examesResponse.data)
        setConsultas(consultasResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Jonathan-Notas: paciente.id entra nas dependências por segurança, caso paciente mude no futuro.
  }, [paciente.id])

  const examesResumo = useMemo(() => {
    // Jonathan-Notas: useMemo evita recalcular valores derivados a cada render sem necessidade.
    const resultados = exames.filter((e) => e.status === 'resultado_disponivel').length
    const aguardando = exames.filter((e) => e.status === 'aguardando_resultado').length
    return { resultados, aguardando }
  }, [exames])

  const consultasRecentes = useMemo(() => {
    // Jonathan-Notas: HOFs (High Order Functions) — slice + map.
    // slice(0, 3): pega as 3 primeiras; map: transforma cada item em JSX.
    return (consultas || []).slice(0, 3)
  }, [consultas])

  if (loading) return <LoadingSpinner />

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header__logo">
          <span>🏥</span>
          <h1>Portal do Paciente</h1>
        </div>

        <nav className="nav">
          <a className="nav__item nav__item--active" href="#">
            Início
          </a>
          <a className="nav__item" href="#">
            Consultas
          </a>
          <a className="nav__item" href="#">
            Exames
          </a>
          <a className="nav__item" href="#">
            Agendamento
          </a>
        </nav>

        <div className="header__user">
          <span>{paciente.nome?.split(' ')[0] || 'Paciente'}</span>
          <button className="btn-logout" type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

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

