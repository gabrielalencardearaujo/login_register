import { ValidaCPF } from './validacpf.js';
import * as GerenciaCadastro from './gerenciaCadastro.js';
import { GeraSenha } from './gerarSenha.js';
import { f } from 'core-js-bundle';

export class Cadastro {
  constructor(name, email, cpf, username, password, passwordC, forgot_password) {
    this.name = name
    this.email = email
    this.cpf = cpf
    this.username = username
    this.password = password
    this.passwordC = passwordC
    this.forgot_password = forgot_password
  }

  verificarCadastro() {
    const email = this.verificaEmail(this.email)
    const cpf = this.verificaCPF(this.cpf)
    const username = this.verificaUsername(this.username)
    const senhas = this.verificaSenhas(this.password, this.passwordC)
    console.log(email, cpf, username, senhas)

    if (email && cpf && username && senhas) {
      this.salvarCadastro()
      console.log('aqui')
      window.location.href = '../../public/success.html';
    }
  }

  verificaCPF(cpf) {
    const validacpf = new ValidaCPF(cpf);
    const CPF = validacpf.formatar();
    (!CPF) ? GerenciaCadastro.erroCPF(cpf) : GerenciaCadastro.validoCPF(cpf);
    return CPF
  }

  verificaEmail(email) {
    const dadosJSON = JSON.parse(localStorage.getItem('CadastroPessoas'))
    const result = dadosJSON.find(key => {
      return key.email === email.value
    })
    if (result) {
      GerenciaCadastro.emailInvalido(email);
      return false
    } else {
      GerenciaCadastro.emailValido(email)
      return true
    }
  }

  verificaUsername(username) {
    if (username.value.length < 6 || username.value.length > 12) {
      GerenciaCadastro.usernameInvalido(username)
      return false
    }
    return true
  }

  verificaSenhas(senha, confirmaSenha) {
    const ary = [false, false, true];
    const erro = [false, false, false, false, false, false];

    (senha.value === confirmaSenha.value) ? ary[0] = true : erro[0] = true;
    (!(senha.value.length <= 8)) ? ary[1] = true : erro[1] = true;

    const cont = [false, false, false, false]
    for (let i = 0; i < senha.value.length; i++) {
      ((senha.value.charCodeAt(i) > 35 && senha.value.charCodeAt(i) < 47) || senha.value.charCodeAt(i) === 64) ? cont[0] = true : '';
      (senha.value.charCodeAt(i) > 48 && senha.value.charCodeAt(i) < 57) ? cont[1] = true : '';
      (senha.value.charCodeAt(i) > 65 && senha.value.charCodeAt(i) < 90) ? cont[2] = true : '';
      (senha.value.charCodeAt(i) > 97 && senha.value.charCodeAt(i) < 122) ? cont[3] = true : '';
    }

    cont.forEach((elemento, index) => {
      if (!elemento) {
        if (index === 0) { erro[2] = true }
        else if (index === 1) { erro[3] = true }
        else if (index === 2) { erro[4] = true }
        else if (index === 3) { erro[5] = true }
        ary[2] = false
      }
    })
    GerenciaCadastro.senhaInvalida(senha, ...erro)
    const result = (ary[0] === true && ary[1] === true && ary[2] === true) ? true : false;

    return result
  }

  verificaSenhaEmailLogin(email, senha) {
    const dadosJSON = JSON.parse(localStorage.getItem('CadastroPessoas'))

    if ((email.value && senha.value)) {
      const verificaLogin = dadosJSON.find(key => {
        return (key.email === email.value && key.password === senha.value)
      });

      (verificaLogin) ? window.location.href = '../../public/success.html' : GerenciaCadastro.cadastroNaoExiste(email, senha);
    } else {
      GerenciaCadastro.cadastroNaoExiste(email, senha)
    }
  }

  visualizarSenha(elemento, senha, senhaC) {
    if (elemento.classList.contains('fa-eye')) {
      senha.setAttribute('type', 'text')
      if (senhaC) { senhaC.setAttribute('type', 'text') }
    } else if (elemento.classList.contains('fa-eye-slash')) {
      senha.setAttribute('type', 'password')
      if (senhaC) { senhaC.setAttribute('type', 'password') }
    }
  }

  salvarCadastro() {
    GerenciaCadastro.salvarJSON(this.name.value, this.email.value, this.cpf.value, this.username.value, this.password.value)
  }

  randomPassword(name, password, passwordC) {
    const gerarSenhaAleatoria = new GeraSenha(name)
    const novaSenha = gerarSenhaAleatoria.geraSenha()
    password.value = novaSenha
    passwordC.value = novaSenha
  }

  forgotPassword(email) {
    const dadosJSON = JSON.parse(localStorage.getItem('CadastroPessoas'))
    const alert = email.parentElement.querySelector('.alerts');
    if (email.value !== '') {
      const verificaEmail = dadosJSON.find(key => {
        return key.email === email.value
      });
      (verificaEmail) ? GerenciaCadastro.mostrarSenhaEsquecida(verificaEmail) : alert.textContent = 'Email nao cadastrado!';
    } else {
      alert.textContent = 'Digite seu email.'
    }
  }
}
