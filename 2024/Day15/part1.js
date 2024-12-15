const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

data = data.split("\n\n")
let instructions = data[1].replaceAll("\n", "").split("")
let grid = data[0].split("\n").map(line => line.split(""))
let height = grid.length
let width = grid[0].length

let robot
let robot_found = false

let i = 0
while (i < height && !robot_found) {
    let j = 0
    while (j < width && !robot_found) {
        if (grid[i][j] == "@") {
            robot = [i, j]
            grid[i][j] = "."
            robot_found = true
        }
        j++
    }
    i++
}

let directions = {
    "v": [1,0],
    "^": [-1,0],
    ">": [0,1],
    "<": [0,-1],
}

instructions.forEach(instruction => {
    let deplacement = directions[instruction]
    let robot_front = [robot[0] + deplacement[0], robot[1] + deplacement[1]]
    while (grid[robot_front[0]][robot_front[1]] == "O") {
        robot_front = [robot_front[0] + deplacement[0], robot_front[1] + deplacement[1]]
    }
    if (grid[robot_front[0]][robot_front[1]] == ".") {
        grid[robot_front[0]][robot_front[1]] = grid[robot[0] + deplacement[0]][robot[1] + deplacement[1]]
        grid[robot[0] + deplacement[0]][robot[1] + deplacement[1]] = "."
        robot = [robot[0] + deplacement[0], robot[1] + deplacement[1]]
    }
})

let result = 0
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (grid[i][j] == "O") {
            result += 100 * i + j
        }
    }
}

const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
