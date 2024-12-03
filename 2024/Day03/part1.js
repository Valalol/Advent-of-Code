const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

// (?<=<string>) : lookbehind
// (?=<string>) : lookahead
// /(?<=mul\()\d+,\d+(?=\))/g
// result = data.match(/(?<=mul\()\d+,\d+(?=\))/g).map(match => match.split(',').map(value => parseInt(value))).map(mult => mult[0] * mult[1]).reduce((partialSum, a) => partialSum + a, 0)

result = data.matchAll(/mul\((\d+),(\d+)\)/g).map(mult => parseInt(mult[1]) * parseInt(mult[2])).reduce((partialSum, a) => partialSum + a, 0)

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)