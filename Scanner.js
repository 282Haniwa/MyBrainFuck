const tokens = require('./tokens')

class Scanner {
  static scanToken(string) {
    const tokenArray = []
    let program = string

    try {
      while (program.length > 0) {
        const token_number = tokenArray.length
        Object.entries(tokens).forEach(token => {
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
  }
}

module.exports = Scanner
