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


for (let second = 0; second < 100; second++) {
    for (let robot of robots) {
        robot.x = (robot.x + robot.dx + height)%height
        robot.y = (robot.y + robot.dy + width)%width
    }
    // console.log(JSON.stringify(robots))
}

let result = [0, 0, 0, 0]
for (let robot of robots) {
    if (robot.x < (height-1)/2 && robot.y < (width-1)/2) result[0]++
    if (robot.x < (height-1)/2 && robot.y > (width-1)/2) result[1]++
    if (robot.x > (height-1)/2 && robot.y < (width-1)/2) result[2]++
    if (robot.x > (height-1)/2 && robot.y > (width-1)/2) result[3]++
}

result = result.reduce((acc, value) => acc * value, 1)

const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
