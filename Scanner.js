const tokens = require('./tokens')

class Scanner {
  static scanToken(string) {
    const tokenList = []
    let program = string

    try {
      while (program.length > 0) {
        const token_number = tokenList.length
        Object.entries(tokens).forEach(token => {
          if (program.indexOf(token[1]) === 0) {
            program = program.replace(token[1], '')
            tokenList.push(token[0])
          }
        })
        if (token_number === tokenList.length) {
          throw new Error('パースできない文字列が現れました。');
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = Scanner
