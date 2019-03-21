class Scanner {
  constructor(tokens) {
    this.tokenDefinition = tokens
  }

  scanToken(string) {
    const tokenArray = []
    let program = string

    try {
      while (program.length > 0) {
        const token_number = tokenArray.length
        Object.entries(this.tokenDefinition).forEach(token => {
          if (program.indexOf(token[1]) === 0) {
            program = program.replace(token[1], '')
            tokenArray.push(token[0])
          }
        })
        if (token_number === tokenArray.length) {
          throw new Error('パースできない文字列が現れました。');
        }
      }
    } catch (error) {
      console.log(e.message);
    }
    return tokenArray
  }
}

module.exports = Scanner
