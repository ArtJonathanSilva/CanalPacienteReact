import axios from 'axios'

// Jonathan-Notas: este arquivo é a “ponte” entre React (JSX) e a lógica da aula
// (manipulação do DOM + requisições com axios).
export function initPortal() {
  // Jonathan-Notas: API base da aula (endpoints do fake API).
  const API_URL = 'https://portal-unimed-fake-api.onrender.com'

  // Jonathan-Notas: aqui pegamos os elementos DOM renderizados pelo JSX do App.jsx.
  const loginPage = document.querySelector('#login-page')
  const appContainer = document.querySelector('#app-container')
  const loginForm = document.querySelector('#login-form')
  const carteirinhaInput = document.querySelector('#carteirinha')
  const senhaInput = document.querySelector('#senha')
  const carteirinhaError = document.querySelector('#carteirinha-error')
  const senhaError = document.querySelector('#senha-error')
  const loginError = document.querySelector('#login-error')

  const userName = document.querySelector('#user-name')
  const btnLogout = document.querySelector('#btn-logout')
  const consultasList = document.querySelector('#consultas-list')
  const consultasCount = document.querySelector('#consultas-count')

  // Jonathan-Notas: guard para evitar erro caso o React ainda não tenha montado o DOM.
  if (
    !loginPage ||
    !appContainer ||
    !loginForm ||
    !carteirinhaInput ||
    !senhaInput ||
    !carteirinhaError ||
    !senhaError ||
    !loginError ||
    !userName ||
    !consultasList ||
    !consultasCount
  ) {
    return
  }

  function validateLogin() {
    // Jonathan-Notas: let/const no ES2015+ para escopo de bloco (evita pegadinhas do var).
    let isValid = true

    // Limpar erros anteriores
    carteirinhaError.textContent = ''
    senhaError.textContent = ''
    loginError.textContent = ''
    carteirinhaInput.classList.remove('input-error')
    senhaInput.classList.remove('input-error')

    // Validar carteirinha
    if (!carteirinhaInput.value.trim()) {
      carteirinhaError.textContent = 'A carteirinha é obrigatória.'
      carteirinhaInput.classList.add('input-error')
      isValid = false
    }

    // Validar senha
    if (!senhaInput.value.trim()) {
      senhaError.textContent = 'A senha é obrigatória.'
      senhaInput.classList.add('input-error')
      isValid = false
    }

    return isValid
  }

  function formatDateTime(dateString) {
    // Jonathan-Notas: converte string da API para uma data amigável em pt-BR.
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getStatusLabel(status) {
    const labels = {
      agendada: 'Agendada',
      realizada: 'Realizada',
      cancelada: 'Cancelada',
    }
    return labels[status] || status
  }

  async function authenticate(carteirinha, senha) {
    try {
      // Jonathan-Notas: axios trabalha com Promises, e aqui usamos async/await
      // para evitar encadeamentos grandes e facilitar o tratamento de erro.
      const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
      return response.data
    } catch (err) {
      // Jonathan-Notas: em erro de autenticação/red, retornamos null pro handler saber o que fazer.
      console.log(err)
      return null
    }
  }

  function createConsultaCard(consulta) {
    const card = document.createElement('div')
    card.className = 'consulta-card'

    card.innerHTML = `
      <div class="consulta-card__header">
        <span class="consulta-card__especialidade">${consulta.especialidade}</span>
        <span class="status-badge status-badge--${consulta.status}">
          ${getStatusLabel(consulta.status)}
        </span>
      </div>
      <p class="consulta-card__medico">${consulta.medico}</p>
      <div class="consulta-card__details">
        <span>📅 ${formatDateTime(consulta.data)}</span>
        <span>📍 ${consulta.local}</span>
      </div>
    `

    return card
  }

  async function showApp(paciente) {
    // Jonathan-Notas: troca de tela via display (sem reload).
    loginPage.style.display = 'none'
    appContainer.style.display = 'block'

    // Jonathan-Notas: nome do paciente no header.
    if (paciente?.nome) {
      userName.textContent = paciente.nome.split(' ')[0]
    }

    // Jonathan-Notas: limpa antes de renderizar (evita duplicar cards se logar de novo).
    consultasList.innerHTML = ''

    try {
      const response = await axios.get(`${API_URL}/consultas`, {
        params: { pacienteId: paciente.id },
      })
      const consultas = response.data

      consultasCount.textContent = `${consultas.length} consulta(s) encontrada(s)`

      consultas.forEach(function (consulta) {
        const card = createConsultaCard(consulta)
        consultasList.appendChild(card)
      })
    } catch (err) {
      console.log(err)
    }
  }

  function handleLogout() {
    // Jonathan-Notas: voltar para a tela de login.
    appContainer.style.display = 'none'
    loginPage.style.display = 'flex'

    // Limpar campos/erros para o próximo login.
    loginForm.reset()
    carteirinhaError.textContent = ''
    senhaError.textContent = ''
    loginError.textContent = ''

    // Limpar lista de consultas.
    consultasList.innerHTML = ''
    consultasCount.textContent = ''
  }

  const onSubmit = async function (event) {
    event.preventDefault()

    if (!validateLogin()) return

    const btnSubmit = loginForm.querySelector('[type="submit"]')
    btnSubmit.disabled = true
    btnSubmit.textContent = 'Entrando...'

    try {
      const paciente = await authenticate(carteirinhaInput.value.trim(), senhaInput.value)

      console.log('Paciente autenticado:', paciente)

      if (paciente) {
        await showApp(paciente)
      } else {
        loginError.textContent = 'Carteirinha ou senha incorretos.'
      }
    } catch (error) {
      loginError.textContent = 'Erro ao conectar com o servidor. Tente novamente.'
    } finally {
      btnSubmit.disabled = false
      btnSubmit.textContent = 'Entrar'
    }
  }

  loginForm.addEventListener('submit', onSubmit)
  btnLogout?.addEventListener('click', handleLogout)

  // Jonathan-Notas: retornamos uma função de cleanup para o React/StrictMode
  // não duplicar listeners (efeito pode rodar duas vezes no dev).
  return function cleanup() {
    loginForm.removeEventListener('submit', onSubmit)
    btnLogout?.removeEventListener('click', handleLogout)
  }
}

