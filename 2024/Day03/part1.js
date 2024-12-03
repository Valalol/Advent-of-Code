const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

result = data.match(/mul\(\d*,\d*\)/gm).map(match => match.slice(4,-1).split(',').map(value => parseInt(value))).map(mult => mult[0] * mult[1]).reduce((partialSum, a) => partialSum + a, 0)

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)