const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

data = data.split("\n\n")
let instructions = data[1].replaceAll("\n", "").split("")
let grid = data[0].replaceAll("#", "##").replaceAll("O", "[]").replaceAll(".", "..").replaceAll("@", "@.").split("\n").map(line => line.split(""))
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


function check_cell(x, y, dx, dy) {
    switch (grid[x][y]) {
        case ".":
            return true
        case "#":
            return false
        case "[":
            if (dx == 0) {
                return check_cell(x + dx, y + dy, dx, dy)
            } else {
                return check_cell(x + dx, y + dy, dx, dy) && check_cell(x + dx, y+1 + dy, dx, dy)
            }
        case "]":
            if (dx == 0) {
                return check_cell(x + dx, y + dy, dx, dy)
            } else {
                return check_cell(x + dx, y + dy, dx, dy) && check_cell(x + dx, y-1 + dy, dx, dy)
            }
    }
}

function pushcell(x, y, dx, dy) {
    let previous_x = x - dx
    let previous_y = y - dy
    switch (grid[x][y]) {
        case ".":
            grid[x][y] = grid[previous_x][previous_y]
            return
        case "[":
            pushcell(x + dx, y + dy, dx, dy)
            grid[x][y] = grid[previous_x][previous_y]
            if (dx != 0) {
                pushcell(x + dx, y+1 + dy, dx, dy)
                grid[x][y+1] = "."
            }
            return
        case "]":
            pushcell(x + dx, y + dy, dx, dy)
            grid[x][y] = grid[previous_x][previous_y]
            if (dx != 0) {
                pushcell(x + dx, y-1 + dy, dx, dy)
                grid[x][y-1] = "."
            }
            return
    }
}


instructions.forEach(instruction => {
    let deplacement = directions[instruction]
    let robot_front = [robot[0] + deplacement[0], robot[1] + deplacement[1]]
    if (check_cell(robot_front[0], robot_front[1], deplacement[0], deplacement[1])) {
        // console.log("Can push")
        pushcell(robot_front[0], robot_front[1], deplacement[0], deplacement[1])
        robot = robot_front
    } else {
        // console.log("Can't push")
    }
})

let result = 0
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        if (grid[i][j] == "[") {
            result += 100 * i + j
        }
    }
}

const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
