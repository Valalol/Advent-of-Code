const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let grid = data.split("\n").map(line => line.split(""))
let height = grid.length
let width = grid[0].length

let remaining_cells = new Set()
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        remaining_cells.add(`${i}|${j}`)
    }
}

function rec_calc_group(cell) {
    let x = cell[0]
    let y = cell[1]
    let new_group = [[x,y]]
    if (remaining_cells.has(`${x+1}|${y}`) && grid[x][y] == grid[x+1][y]) {
        remaining_cells.delete(`${x+1}|${y}`)
        new_group.push(...rec_calc_group([x+1,y]))
    }
    if (remaining_cells.has(`${x-1}|${y}`) && grid[x][y] == grid[x-1][y]) {
        remaining_cells.delete(`${x-1}|${y}`)
        new_group.push(...rec_calc_group([x-1,y]))
    }
    if (remaining_cells.has(`${x}|${y+1}`) && grid[x][y] == grid[x][y+1]) {
        remaining_cells.delete(`${x}|${y+1}`)
        new_group.push(...rec_calc_group([x,y+1]))
    }
    if (remaining_cells.has(`${x}|${y-1}`) && grid[x][y] == grid[x][y-1]) {
        remaining_cells.delete(`${x}|${y-1}`)
        new_group.push(...rec_calc_group([x,y-1]))
    }
    return new_group
}

function calc_sides(group) {
    let sides = 0
    let group_set = new Set()
    for (let cell of group) {
        group_set.add(`${cell[0]}|${cell[1]}`)
    }
    for (let cell of group) {
        if (!group_set.has(`${cell[0]+1}|${cell[1]}`) && (!group_set.has(`${cell[0]}|${cell[1]+1}`) || group_set.has(`${cell[0]+1}|${cell[1]+1}`))) sides++
        if (!group_set.has(`${cell[0]-1}|${cell[1]}`) && (!group_set.has(`${cell[0]}|${cell[1]-1}`) || group_set.has(`${cell[0]-1}|${cell[1]-1}`))) sides++
        if (!group_set.has(`${cell[0]}|${cell[1]+1}`) && (!group_set.has(`${cell[0]-1}|${cell[1]}`) || group_set.has(`${cell[0]-1}|${cell[1]+1}`))) sides++
        if (!group_set.has(`${cell[0]}|${cell[1]-1}`) && (!group_set.has(`${cell[0]+1}|${cell[1]}`) || group_set.has(`${cell[0]+1}|${cell[1]-1}`))) sides++
    }
    return sides
}


let groups = []
while (remaining_cells.size > 0) {
    let new_cell = remaining_cells.values().next().value
    remaining_cells.delete(new_cell)
    groups.push(rec_calc_group(new_cell.split("|").map(Number)))
}

for (let group of groups) {
    let sides = calc_sides(group)
    console.log(`A region of ${grid[group[0][0]][group[0][1]]} plants with price ${group.length} * ${sides} = ${group.length * sides}.`)
}
let result = groups.map(group => group.length * calc_sides(group)).reduce((partial_sum, value) => partial_sum + value, 0)


// create a list of all the remaining cells
// Take the first cell of the remaining cells
// create a group with this first cell
// for each of the neighboors, if cell in remaining cells check letter of cell
// if same letter, add it to the group and repeat on the new cell


const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
