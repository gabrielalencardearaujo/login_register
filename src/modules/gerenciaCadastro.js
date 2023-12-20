export const salvarJSON = (nome, email, cpf, username, password) => {
  let objDados = organizaDados(nome, email, cpf, username, password)
  const recebeCadastro = recebeJSON()
  recebeCadastro.push(objDados)
  const dadosJSON = JSON.stringify(recebeCadastro)
  localStorage.setItem('CadastroPessoas', dadosJSON)
}

function recebeJSON() {
  const converteJSON = JSON.parse(localStorage.getItem('CadastroPessoas'))

  return converteJSON
}

function organizaDados(nome, email, cpf, username, password) {
  return {
    nome,
    email,
    cpf,
    username,
    password
  }
}

export function emailInvalido(email) {
  const alert = email.parentElement.querySelector('.alerts')
  alert.style.color = 'red'
  alert.textContent = ``
  alert.textContent = `Email já cadastro!`
}

export function emailValido(email) {
  const alert = email.parentElement.querySelector('.alerts')
  alert.textContent = ``
}

export function usernameInvalido(username) {
  const alert = username.parentElement.querySelector('.alerts')
  alert.textContent = `Username deve conter de 6 a 12 caracteres`
}

export function senhaInvalida(inputSenha, diferent, small, noSpecialCaractere, noNumber, noUppercase, noLowercase) {
  const alert = inputSenha.parentElement.querySelector('.alerts')
  alert.innerHTML = ''

  if (diferent) { alert.innerHTML += `<p>* Senhas devem ser iguais.</p>` }
  if (small) { alert.innerHTML += `<p>* Senha deve conter mais de 8 caracteres.</p>` }
  if (noSpecialCaractere) { alert.innerHTML += `<p>* Senha deve conter pelo menos 1 caracter especial.</p>` }
  if (noNumber) { alert.innerHTML += `<p>* Senha deve conter pelo menos 1 numero.</p>` }
  if (noUppercase) { alert.innerHTML += `<p>* Senha deve conter pelo uma letra maiuscula.</p>` }
  if (noLowercase) { alert.innerHTML += `<p>* Senha deve conter pelo uma letra minuscula.</p>` }
}

export function cadastroNaoExiste(email,senha) {
  const alert = senha.parentElement.querySelector('.alerts');
  (email.value === '' || senha.value === '') ? alert.textContent = 'Digite seu Email e Senha corretamente.' : alert.textContent = 'Usuario e/ou senha incorreto(s).';
}

export function erroCPF(inputCPF) {
  const alert = inputCPF.parentElement.querySelector('.alerts')
  alert.style.color = 'red'
  alert.textContent = ''
  alert.textContent = 'CPF invalido.'
}

export function validoCPF(inputCPF) {
  const alert = inputCPF.parentElement.querySelector('.alerts')
  alert.textContent = ''
}

export function mostrarSenhaEsquecida(objSenha){
  const inputSenha = document.querySelector('#ipassword_login')
  inputSenha.value = objSenha.password
  const alert = inputSenha.parentElement.querySelector('.alerts')
  alert.textContent = 'Sua senha!'
}
