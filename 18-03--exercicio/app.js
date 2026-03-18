// Jonathan-Notas: URL base da API (HTTP/JSON). Usamos uma constante para evitar "strings mágicas"
// repetidas ao longo do código e facilitar manutenção/alteração do ambiente (dev/prod).
const API_URL = 'https://portal-unimed-fake-api.onrender.com'

// Jonathan-Notas: querySelector() (padrão do DOM) busca elementos por seletor CSS.
// Antes: seria comum usar var + lógica espalhada sem guardar referências. Agora: mantemos
// referências nomeadas em constantes/variáveis para deixar as chamadas mais claras.
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


function validateLogin() {
  // Jonathan-Notas: usamos let (ES6/2015) para variável que muda. Antes, era comum usar "var"
  // que tem escopo de função e pode causar confusão. Com let/const, o escopo é de bloco.
  let isValid = true

  // Jonathan-Notas: limpar erros anteriores evita mensagens duplicadas em múltiplas tentativas.
  carteirinhaError.textContent = ''
  senhaError.textContent = ''
  loginError.textContent = ''
  carteirinhaInput.classList.remove('input-error')
  senhaInput.classList.remove('input-error')

  // Jonathan-Notas: trim() remove espaços. Isso evita que "    " passe como valor válido.
  if (!carteirinhaInput.value.trim()) {
    carteirinhaError.textContent = 'A carteirinha é obrigatória.'
    carteirinhaInput.classList.add('input-error')
    isValid = false
  }

  // Jonathan-Notas: mesma lógica de validação para senha.
  if (!senhaInput.value.trim()) {
    senhaError.textContent = 'A senha é obrigatória.'
    senhaInput.classList.add('input-error')
    isValid = false
  }

  return isValid
}

function formatDateTime(dateString) {
  // Jonathan-Notas: formatDateTime usa Date + toLocaleString('pt-BR').
  // Isso melhora a legibilidade para o usuário e evita render "crua" da data.
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusLabel(status) {
  // Jonathan-Notas: mapeia status do backend (chave) para label amigável no front.
  // Isso evita montar texto manual em vários lugares do código.
  const labels = {
    agendada: 'Agendada',
    realizada: 'Realizada',
    cancelada: 'Cancelada',
  }
  return labels[status] || status
}


// =============================================
// AULA 02 - AUTENTICAÇÃO E CONSUMO DE API
// =============================================

loginForm.addEventListener('submit', async function (event) {
  // Jonathan-Notas: event.preventDefault() impede o submit recarregar a página.
  event.preventDefault()

  // Jonathan-Notas: validação antes de chamar API reduz chamadas desnecessárias e dá feedback rápido.
  if (!validateLogin()) return

  // Jonathan-Notas: feedback visual/UX durante chamada assíncrona (evita dupla submissão).
  const btnSubmit = loginForm.querySelector('[type="submit"]')
  btnSubmit.disabled = true
  btnSubmit.textContent = 'Entrando...'

  try {
    // Jonathan-Notas: async/await (ES2017/ES8) substitui encadeamento com callbacks/then(),
    // reduzindo "callback hell" e "promise hell" (código profundamente aninhado).
    const paciente = await authenticate(carteirinhaInput.value.trim(), senhaInput.value)
    console.log('Paciente autenticado:', paciente)

    if (paciente) {
      // Jonathan-Notas: após sucesso, trocamos a tela e carregamos as consultas do paciente.
      showApp(paciente)
    } else {
      // Jonathan-Notas: authenticate() retorna null quando o POST /login falha.
      loginError.textContent = 'Carteirinha ou senha incorretos.'
    }
  } catch (error) {
    // Jonathan-Notas: catch cobre erros inesperados (ex.: indisponibilidade de rede/API).
    loginError.textContent = 'Erro ao conectar com o servidor. Tente novamente.'
  } finally {
    // Jonathan-Notas: finally roda mesmo em erro/sucesso: reabilita o botão e volta o texto.
    btnSubmit.disabled = false
    btnSubmit.textContent = 'Entrar'
  }
})

async function authenticate(carteirinha, senha) {
  try {
    // Jonathan-Notas: axios é uma biblioteca HTTP baseada em Promises.
    // Aqui fazemos POST /login para autenticar.
    // Antes (sem async/await): ficaria algo como axios.post(...).then(...).catch(...),
    // que pode virar "promise hell" com muitos níveis. Agora usamos await.
    const response = await axios.post(`${API_URL}/login`, { carteirinha, senha })
    console.log(response.data)
    // Jonathan-Notas: a resposta do axios fica em response.data (conteúdo JSON).
    return response.data
  } catch (err) {
    // Jonathan-Notas: em erro, retornamos null para padronizar o tratamento no submit handler.
    console.log(err);
    return null;
  }

}

async function showApp(paciente) {
  // Jonathan-Notas: troca de tela controla exibição via CSS inline (style.display).
  loginPage.style.display = "none"
  appContainer.style.display = "block"

  // Jonathan-Notas: nome do paciente exibido no header.
  // Antes: render seria feito só no HTML estático. Agora: o JavaScript preenche dinamicamente.
  userName.textContent = paciente.nome.split(' ')[0]

  try {
    // Jonathan-Notas: GET /consultas com query params para filtrar pelo paciente.
    // A API pede pacienteId, então usamos params: { pacienteId: paciente.id }.
    // axios.get montará a URL final como .../consultas?pacienteId=...
    const response = await axios.get(`${API_URL}/consultas`, { params: { pacienteId: paciente.id } })
    const consultas = response.data;
    console.log(consultas);

    // Jonathan-Notas: renderização dinâmica via forEach + DOM.
    // Antes: render estático. Agora: criamos cards a partir dos dados da API.
    consultas.forEach(consulta => {
      const card = createConsultaCard(consulta)
      consultasList.appendChild(card);
    })
  } catch (err) {
    // Jonathan-Notas: se o GET falhar, não quebramos o app inteiro; apenas registramos o erro.
    console.log(err);
  }

}


function createConsultaCard(consulta) {
  // Jonathan-Notas: criação do card em runtime usando createElement + innerHTML.
  // O template literal (`...`) é ES2015 e facilita inserir valores no HTML.
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
