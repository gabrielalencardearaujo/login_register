export class GeraSenha {
  constructor(name) {
    this.name = name;
    this.number = '0123456789'
    this.upper = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ'
    this.lower = 'abcdefghijklmnopqrstuvxwyz'
    this.symbol = "#$%&()*+-/@"
    this.concatenaSenha = ''
    this.createPassword = ''
  }

  geraSenha() {
    let random;
    for (let i = 0; i < 2; i++) {
      random = Math.floor(Math.random() * this.number.length)
      this.concatenaSenha += this.number[random]

      random = Math.floor(Math.random() * this.upper.length)
      this.concatenaSenha += this.upper[random]

      random = Math.floor(Math.random() * this.lower.length)
      this.concatenaSenha += this.lower[random]

      random = Math.floor(Math.random() * this.symbol.length)
      this.concatenaSenha += this.symbol[random]
    }

    return this.formataSenha(this.concatenaSenha)
  }

  formataSenha(senha) {
    const embaralhaSenha = senha.split('').sort(() => Math.random() - 0.5).join('');
    const name = this.formataNome()
    return name + embaralhaSenha
  }

  formataNome() {
    if (this.name) {
      let arrayName = this.name.split(' ')
      let randomChoiceWordsName = Math.floor(Math.random() * arrayName.length)
      return arrayName[randomChoiceWordsName]
    } else {
      return ''
    }
  }
}