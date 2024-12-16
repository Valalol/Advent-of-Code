const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

let grid = data.split("\n").map(line => line.split(""))
let height = grid.length
let width = grid[0].length
let directions = [[0,1], [-1,0], [0,-1], [1,0]]

let start = undefined
let end = undefined

let i = 0
while (i < height && (!start || !end)) {
    let j = 0
    while (j < width && (!start || !end)) {
        if (grid[i][j] == "S") {
            start = [i, j]
            grid[i][j] = "."
        } else if (grid[i][j] == "E") {
            end = [i, j]
            grid[i][j] = "."
        }
        j++
    }
    i++
}
start[2] = 0

function is_finished(state) {
    return state[0] == end[0] && state[y] == end[x]
}

function rotate_clockwise(state) {
    return [state[0], state[1], (d-1 + 4)%4]
}
function rotate_counter_clockwise(state) {
    return [state[0], state[1], (d+1 + 4)%4]
}
function move_forward(state) {
    let [dx, dy] = directions[state[2]]
    return [state[0] + dx, state[1] + dy, state[2]]
}

let states = []

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (grid[x][y] == ".") {
            for (let k = 0; k < 4; k++) {
                states.push()
            }
        }
    }
}





let result = 0


const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
