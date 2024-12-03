const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

// (?<=<string>) : lookbehind
// (?=<string>) : lookahead
result = data.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g).reduce((acc, element) => {
    if (element[0] == "do()") {acc[1] = true; return acc}
    else if (element[0] == "don't()") {acc[1] = false; return acc}
    else if (acc[1]) {acc[0] += parseInt(element[1]) * parseInt(element[2]); return acc}
    else return acc
}, [0, true])[0]

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)