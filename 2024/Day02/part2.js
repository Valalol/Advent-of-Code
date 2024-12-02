const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split('\n').map(line => line.split(' ').map(value => parseInt(value)))
spliced_data = data.map(line => line.map((_, index) => line.toSpliced(index, 1)))
diffs = spliced_data.map(line => line.map(spliced_line => spliced_line.slice(0,-1).map((value, index) => {return value - spliced_line[index+1]})))
bools = diffs.map(line => line.some(spliced_line => spliced_line.every(value => Math.abs(value) <= 3) && (spliced_line.every(value => value < 0) || spliced_line.every(value => value > 0))))
result = bools.filter(Boolean).length

// result = data.split('\n').map(line => line.split(' ').map(value => parseInt(value))).map(line => line.map((_, index) => line.toSpliced(index, 1))).map(line => line.map(spliced_line => spliced_line.slice(0,-1).map((value, index) => {return value - spliced_line[index+1]}))).map(line => line.some(spliced_line => spliced_line.every(value => Math.abs(value) <= 3) && (spliced_line.every(value => value < 0) || spliced_line.every(value => value > 0)))).filter(Boolean).length

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)