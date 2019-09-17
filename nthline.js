var readline = require('readline'),
  fs = require('fs')

var outOfRangeError = function(filepath, n) {
  return new RangeError(
    `Line with index ${n} does not exist in '${filepath}. Note that line indexing is zero-based'`
  )
}

module.exports = function(n, filepath) {
  return new Promise(function(resolve, reject) {
    if (n < 0 || n % 1 !== 0)
      return reject(new RangeError(`Invalid line number`))

    var cursor = 0,
      input = fs.createReadStream(filepath),
      rl = readline.createInterface({ input })

    rl.on('line', function(line) {
      if (cursor++ === n) {
        rl.close()
        input.close()
        resolve(line)
      }
    })

    rl.on('error', reject)

    input.on('end', function() {
      reject(outOfRangeError(filepath, n))
    })
  })
}
