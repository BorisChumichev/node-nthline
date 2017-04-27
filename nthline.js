var readline = require('readline')
  , fs = require('fs')
  , bb = require('bluebird')

var outOfRangeError = function(filepath, n, cursor) {
  return new RangeError(
    `Requested line ${n} but '${filepath}' has only ${cursor} lines`
  )
}

module.exports = function (n, filepath) {
  return new bb(function(resolve, reject) {
    if (n < 0 || n % 1 !== 0)
      return reject(new RangeError(`Invalid line number`))

    var cursor = 0
      , input = fs.createReadStream(filepath)
      , rl = readline.createInterface({ input })

    rl.on('line', function(line) {
      if (cursor++ === n) {
        rl.close()
        resolve(line)
      }
    })

    rl.on('error', reject)
    input.on('end', function() {
      reject(outOfRangeError(filepath, n, cursor))
    })
  })
}
