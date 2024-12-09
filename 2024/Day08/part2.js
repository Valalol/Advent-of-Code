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
        // .map(antinode => [node[0] - (antinode[0] - node[0]), node[1] - (antinode[1] - node[1])])
        // .filter(antinode => antinode[0] >= 0 && antinode[0] < height && antinode[1] >= 0 && antinode[1] < width)
        all_coordinates.toSpliced(index, 1).forEach(other_node => {
            let dx = other_node[0] - node[0]
            let dy = other_node[1] - node[1]
            new_antinode = [node[0] + dx, node[1] + dy]
            while (new_antinode[0] >= 0 && new_antinode[0] < height && new_antinode[1] >= 0 && new_antinode[1] < width) {
                if (!antinodes.has(`${new_antinode[0]}|${new_antinode[1]}`)) {
                    antinodes.add(`${new_antinode[0]}|${new_antinode[1]}`)
                }
                new_antinode = [new_antinode[0] + dx, new_antinode[1] + dy]
            }
        })
    })
}
result = antinodes.size

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
