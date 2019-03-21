const BrainFuck = require('./BrainFuck')

const aBrainFuck = new BrainFuck()
const result = aBrainFuck.evaluate('+++++++++[>++++++++>+++++++++++>+++>+<<<<-]>.>++.+++++++..+++.>+++++.<<+++++++++++++++.>.+++.------.--------.>+.>+.')
console.log(result)
