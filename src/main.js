// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import { Cadastro } from './modules/cadastro.js';

const iconEye = document.querySelector('.icon')
const btn_login = document.querySelector('.login')
const generatePassword = document.querySelector('#care_password')

document.addEventListener('submit', e => {
  e.preventDefault()

  if (e.target.classList.contains('cadastro')) {
    const name = document.querySelector('#iname')
    const email = document.querySelector('#iemail')
    const cpf = document.querySelector('#icpf')
    const username = document.querySelector('#iusername')
    const password = document.querySelector('#ipassword')
    const passwordC = document.querySelector('#ipasswordC')
    const forgot_password = document.querySelector('#forgot_password')

    const cadastro = new Cadastro(name, email, cpf, username, password, passwordC, forgot_password)
    cadastro.verificarCadastro()
  }

  if (e.target.classList.contains('login')) {
    const emailLogin = document.querySelector('#iemail_login')
    const senhaLogin = document.querySelector('#ipassword_login')
    const acessoLogin = new Cadastro()
    acessoLogin.verificaSenhaEmailLogin(emailLogin, senhaLogin)
  }
})

iconEye.addEventListener('click', e => {
  const el = e.target
  const cadastro = new Cadastro()
  const senha = document.querySelector('.senha')
  const senhaC = document.querySelector('.repetir_senha')

  if (el.classList.contains('fa-eye-slash')) {
    el.classList.remove('fa-eye-slash')
    el.classList.add('fa-eye')
  } else if (el.classList.contains('fa-eye')) {
    el.classList.remove('fa-eye')
    el.classList.add('fa-eye-slash')
  }
  cadastro.visualizarSenha(el, senha, senhaC)
})

generatePassword.addEventListener('click', el => {
  const cadastro = new Cadastro()

  if(el.target.classList.contains('generatePassword')){
    const password = document.querySelector('#ipassword')
    const passwordC = document.querySelector('#ipasswordC')
    const name = document.querySelector('#iname')
  
    cadastro.randomPassword(name.value, password, passwordC)
  } else if(el.target.classList.contains('forgotPassword')){
    const email = document.querySelector('#iemail_login')
    cadastro.forgotPassword(email)
  }
})
