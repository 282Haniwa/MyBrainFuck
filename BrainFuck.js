const Scanner = require('./Scanner')
const SemanticAnalyzer = require('./SemanticAnalyzer')
const defaultTokens = require('./tokens')

class BrainFuck {
  constructor(tokens = defaultTokens) {
    this.tokenDefinition = tokens
    this._scanner = new Scanner(tokens)
  }

  setTokentokenDefinition(tokenDefinition) {
    this.tokenDefinition = tokenDefinition
  }

  static evaluate(program) {
    const aBrainFuck = new BrainFuck()
    const result = aBrainFuck.evaluate(program)
    return result
  }

  evaluate(program) {
    const tokenArray = this._scanner.scanToken(program)
    const result = SemanticAnalyzer.evaluate(tokenArray)
    return result
  }
}

module.exports = BrainFuck
