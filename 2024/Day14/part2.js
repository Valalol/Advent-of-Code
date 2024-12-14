const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

let robots = data.split("\n").map(robot_str => robot_str.split(" ").map(element => element.split("=")[1].split(",").map(Number)))
.map(robot_array => {
    let robot = {}
    robot.x = robot_array[0][1]
    robot.y = robot_array[0][0]
    robot.dx = robot_array[1][1]
    robot.dy = robot_array[1][0]
    return robot
})

let height = 103
let width = 101

async function display_robots(robots, height, width, second) {
    let grid = []
    for (let i = 0; i < height; i++) {
        grid.push([])
        for (let j = 0; j < width; j++) {
            grid[i].push(0)
        }
    }
    for (let robot of robots) {
        grid[robot.x][robot.y]++
    }
    let grid_str = grid.map(line => line.map(element => element == 0 ? "." : element).join("")).join("\n")
    fs.writeFileSync(__dirname + `/results/result_${second}.txt`, grid_str, err => {});
}

function find_tree(robots, height, width) {
    let robots_pos = new Set()
    for (let robot of robots) {
        robots_pos.add(`${robot.x}|${robot.y}`)
    }
    for (let i = 0; i < height - 4; i++) {
        for (let j = 4; j < width - 4; j++) {
            if (
                robots_pos.has(`${i}|${j}`) &&
                robots_pos.has(`${i+1}|${j-1}`) &&
                robots_pos.has(`${i+1}|${j+1}`) &&
                robots_pos.has(`${i+2}|${j-2}`) &&
                robots_pos.has(`${i+2}|${j+2}`) &&
                robots_pos.has(`${i+3}|${j-3}`) &&
                robots_pos.has(`${i+3}|${j+3}`) &&
                robots_pos.has(`${i+4}|${j-4}`) &&
                robots_pos.has(`${i+4}|${j+4}`)
            ) return true
        }
    }
    return false
}

let tree_found = false
let second = 0
while (!tree_found) {
    for (let robot of robots) {
        robot.x = (robot.x + robot.dx + height)%height
        robot.y = (robot.y + robot.dy + width)%width
    }
    second++
    tree_found = find_tree(robots, height, width)
}
let result = second
// display_robots(robots, height, width, second)


// result = result.reduce((acc, value) => acc * value, 1)

const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
