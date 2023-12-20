//Script para validar CPF.
import { erroCPF } from './gerenciaCadastro.js';

export class ValidaCPF {
  constructor(cpf) {
      this.cpf = cpf.value
      this.inputcpf = document.querySelector('.cpf')
      this.arrayCPF
  }

  formatar() {
      this.cpf = this.cpf.replace(/\D+/g, '')
      this.arrayCpf = Array.from(this.cpf)
      this.arrayCpf.splice(9, 2)

      for (let i = 0; i < 2; i++) {
          this.calculoDigito()
      }
      const result = this.validar()
      return result 
  }

  calculoDigito() {
      let i = this.arrayCpf.length + 1
      let ac = 0

      for (let valor of this.arrayCpf) {
          ac += i * valor
          i--
      }

      let digito = 11 - (ac % 11)
      digito > 9 ? digito = '0' : digito;
      this.arrayCpf.push(String(digito))
  }

  validar() {
      this.arrayCpf = this.arrayCpf.join('')
      return this.arrayCpf === this.cpf
  }
}
// export const test = 'Hello'
// document.addEventListener('submit', e => {
//   const cpf = document.querySelector('.cpf').value
//   const validarCPF = new ValidaCPF(cpf)
//   validarCPF.formatar()
// })