const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split('\n').map(line => line.split(' ').map(value => parseInt(value)))
diffs = data.map(line => line.slice(0,-1).map((value, index) => {return value - line[index+1]}))
bools = diffs.map(line => line.every(value => Math.abs(value) <= 3) && (line.every(value => value < 0) || line.every(value => value > 0)))
result = bools.filter(Boolean).length

// result = data.split('\n').map(line => line.split(' ').map(value => parseInt(value))).map(line => line.slice(0,-1).map((value, index) => {return value - line[index+1]})).map(line => line.every(value => Math.abs(value) <= 3) && (line.every(value => value < 0) || line.every(value => value > 0))).filter(Boolean).length

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)