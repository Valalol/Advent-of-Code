const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split("\n").map(line => line.split(""))

As = data.map((line, line_index) => line.map((letter, col_index) => [letter, line_index, col_index]).filter(element => element[0] == "A")).flat(1)
center_As = As.filter(element => element[1] >= 1 && element[1] < data.length-1 && element[2] >= 1 && element[2] < data[0].length-1)
neighboor_A_values = center_As.map(value => [[data[value[1]-1][value[2]-1], data[value[1]+1][value[2]+1]], [data[value[1]-1][value[2]+1], data[value[1]+1][value[2]-1]]])
result = neighboor_A_values.filter(value => value[0].includes("M") && value[0].includes("S") && value[1].includes("M") && value[1].includes("S")).length

// result = data.map((line, line_index) => line.map((letter, col_index) => [letter, line_index, col_index]).filter(element => element[0] == "A")).flat(1).filter(element => element[1] >= 1 && element[1] < data.length-1 && element[2] >= 1 && element[2] < data[0].length-1).map(value => [[data[value[1]-1][value[2]-1], data[value[1]+1][value[2]+1]], [data[value[1]-1][value[2]+1], data[value[1]+1][value[2]-1]]]).filter(value => value[0].includes("M") && value[0].includes("S") && value[1].includes("M") && value[1].includes("S")).length

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
