const fs = require('node:fs');

let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let height = data.split("\n").length
let width = data.split("\n")[0].split("").length
let frequencies_positions = {};

data.split("\n").forEach((line, line_index) => {
    line.split("").forEach((element, col_index) => {
        if (element != '.') {
            if (!(element in frequencies_positions)) {
                frequencies_positions[element] = []
            }
            frequencies_positions[element].push([line_index, col_index])
        }
    })
});

let antinodes = new Set() 
for (const frequency in frequencies_positions) {
    // console.log(frequency)
    frequencies_positions[frequency].forEach((node, index, all_coordinates) => {
        let result = all_coordinates.toSpliced(index, 1).map(antinode => [node[0] - (antinode[0] - node[0]), node[1] - (antinode[1] - node[1])]).filter(antinode => antinode[0] >= 0 && antinode[0] < height && antinode[1] >= 0 && antinode[1] < width)
        // console.log(JSON.stringify(result))
        result.forEach(antinode => {
            if (!antinodes.has(`${antinode[0]}|${antinode[1]}`))
            antinodes.add(`${antinode[0]}|${antinode[1]}`)
        })
    })
}
result = antinodes.size

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
