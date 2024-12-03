const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

result = data.match(/(?<!don't\(\).*?)(?:do\(\).*?)?mul\(\d+,\d+\)/g)

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)