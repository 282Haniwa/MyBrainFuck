const fs = require('fs')
const readlineSync = require('readline-sync')
const BrainFuck = require('./src/BrainFuck')

if (process.argv[2] === '-i' || process.argv[2] === '--interpreter') {
  // インタプリタモード
  let inputString = ''
  while (true) {
    const inputLine = readlineSync.prompt()
    if (inputLine === 'exit') {
      break
    }
    inputString += inputLine
    if (inputLine === '') {
      const aBrainFuck = new BrainFuck()
      const result = aBrainFuck.evaluate(inputString)
      console.log(result)
      inputString = ''
    }
  }
} else {
  // ファイル指定モード
  const fileName = process.argv[2]
  fs.readFile(fileName, 'utf-8', (error, data) => {
    if (error) {
      throw error
    }
    const aBrainFuck = new BrainFuck()
    const result = aBrainFuck.evaluate(data)
    console.log(result)
  })
}
