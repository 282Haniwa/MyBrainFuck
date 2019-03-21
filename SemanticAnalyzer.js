const readlineSync = require('readline-sync')

const ARRAY_SIZE = 30000

class SemanticAnalyzer {
  constructor(tokenArray) {
    this.ARRAY_SIZE = ARRAY_SIZE
    this._tokenArray = tokenArray
    this._tokenIndex = 0
    this._valueArray = Array(ARRAY_SIZE)
    this._valueArray.fill(0)
    this._pointer = 0
    this._jumpKeyStack = []
    this._buffer = []
    this._executiveOrder = {
      POINTER_INCREMENT : this._pointerIncrement.bind(this),
      POINTER_DECREMENT : this._pointerDecrement.bind(this),
      VALUE_INCREMENT   : this._valueIncrement.bind(this),
      VALUE_DECREMENT   : this._valueDecrement.bind(this),
      PUT_CHARACTER     : this._putCharacter.bind(this),
      GET_CHARACTER     : this._getCharacter.bind(this),
      START_JUMP_BLOCK  : this._startJumpBlock.bind(this),
      END_JUMP_BLOCK    : this._endJumpBlock.bind(this)
    }
  }

  static evaluate(tokenArray) {
    const aSemanticAnalyzer = new SemanticAnalyzer(tokenArray)
    const result = aSemanticAnalyzer.evaluate()
    return result
  }

  evaluate() {
    this.clear()
    while (true) {
      const token = this._tokenArray[this._tokenIndex]
      this._executiveOrder[token]()
      this._tokenIndex++
      if (this._tokenIndex === this._tokenArray.length) {
        break
      }
    }
    return this._buffer.join('')
  }

  clear() {
    this._tokenIndex = 0
    this._valueArray.fill(0)
    this._pointer = 0
    this._buffer = []
  }

  _pointerIncrement() {
    if (this._pointer < this.ARRAY_SIZE - 1) {
      this._pointer++
    }
  }

  _pointerDecrement() {
    if (this._pointer > 0) {
      this._pointer--
    }
  }

  _valueIncrement() {
    if (Number.isSafeInteger(this._valueArray[this._pointer] + 1)) {
      this._valueArray[this._pointer]++
    }
  }

  _valueDecrement() {
    if (Number.isSafeInteger(this._valueArray[this._pointer] - 1)) {
      this._valueArray[this._pointer]--
    }
  }

  _putCharacter() {
    this._buffer.push(String.fromCharCode(this._valueArray[this._pointer]))
  }

  _getCharacter() {
    const inputString = readlineSync.question('input character: ')
    const inputCharacter = inputString.charCodeAt(0)
    this._valueArray[this._pointer] = inputCharacter
    console.log(`-> input character code: ${inputCharacter}`)
  }

  _startJumpBlock() {
    const stackIndex = this._jumpKeyStack.length
    this._jumpKeyStack.push(this._tokenIndex)
    if (this._valueArray[this._pointer] === 0) {
      while (true) {
        const token = this._tokenArray[++this._tokenIndex]
        if (token === 'START_JUMP_BLOCK') {
          this._jumpKeyStack.push(this._tokenIndex)
        } else if (token === 'END_JUMP_BLOCK') {
          this._jumpKeyStack.pop()
          if (stackIndex === this._jumpKeyStack.length) {
            break
          }
        } else {
          this._executiveOrder[token]()
        }
        this._tokenIndex++
      }
    }
  }

  _endJumpBlock() {
    const jumpStartTokenIndex = this._jumpKeyStack.pop()
    if (this._valueArray[this._pointer] !== 0) {
      this._tokenIndex = jumpStartTokenIndex
      this._jumpKeyStack.push(jumpStartTokenIndex)
    }
  }
}

module.exports = SemanticAnalyzer
