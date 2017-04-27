const readline = require('readline')
  , fs = require('fs')
  , bb = require('bluebird')

const outOfRangeError = (filepath, n, cursor) =>
  new RangeError(
    `Requested line ${n} but '${filepath}' has only ${cursor} lines`
  )

module.exports = (n, filepath) =>
  new bb((resolve, reject) => {
    if (n < 0 || n % 1 !== 0)
      return reject(new RangeError(`Invalid line number`))

    let cursor = 0
    const input = fs.createReadStream(filepath)
      , rl = readline.createInterface({ input })

    rl.on('line', line => {
      if (cursor++ === n) {
        rl.close()
        resolve(line)
      }
    })

    rl.on('error', reject)
    input.on('end', () =>
      reject(outOfRangeError(filepath, n, cursor))
    )
  })
