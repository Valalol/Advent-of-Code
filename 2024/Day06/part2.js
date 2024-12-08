const fs = require('node:fs');


function is_leaving(new_position, width, height) {
    return (new_position[0] < 0 || new_position[0] >= height || new_position[1] < 0 || new_position[1] >= width)
}

function calc_new_state(obstacles, gardien, width, height) {
    // let directions_str = ["^", ">", "v", "<"]
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    let déplacement = directions[gardien[0]]
    let new_position = [gardien[1]+déplacement[0], gardien[2]+déplacement[1]]
    if (is_leaving(new_position, width, height)) {
        return false
    } else if (obstacles.has(`${new_position[0]}|${new_position[1]}`)) {
        return [(gardien[0]+1)%4, gardien[1], gardien[2]]
    } else {
        return [gardien[0], new_position[0], new_position[1]]
    }
}

let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let height = data.split("\n").length
let width = data.split("\n")[0].split("").length
let gardien = []
let obstacles = new Set();

data.split("\n").forEach((line, line_index) => {
    line.split("").forEach((element, col_index) => {
        switch (element) {
            case "#":
                obstacles.add(`${line_index}|${col_index}`)
                break;
            case "^":
                gardien = [0, line_index, col_index]
                break;
        }
    })
});

// Get cases parcourues normalement
let modified_gardien = [...gardien]
let cases_parcourues = new Set()
cases_parcourues.add(`${gardien[1]}|${gardien[2]}`)
while (modified_gardien = calc_new_state(obstacles, modified_gardien, width, height)) {
    if (!cases_parcourues.has(`${modified_gardien[1]}|${modified_gardien[2]}`)) {
        cases_parcourues.add(`${modified_gardien[1]}|${modified_gardien[2]}`)
    }
}
let result1 = cases_parcourues.size


let result2 = 0
for (case_parcourue of Array.from(cases_parcourues)) {
    let [i,j] = case_parcourue.split('|').map(Number)
    // check if no obstacle at (i, j)
    // else pass
    if (gardien[1] != i || gardien[2] != j) {
        // add new_obstacle to obstacle list and save it to a new obstacle list
        // modified_obstacles = obstacles.concat([[i,j]])
        obstacles.add(`${i}|${j}`)
        modified_gardien = [...gardien]

        past_state = new Set()
        while (modified_gardien = calc_new_state(obstacles, modified_gardien, width, height)) {
            if (past_state.has(`${modified_gardien[0]}|${modified_gardien[1]}|${modified_gardien[2]}`)) {
                result2++
                break
            } else {
                past_state.add(`${modified_gardien[0]}|${modified_gardien[1]}|${modified_gardien[2]}`)
            }
        }
        obstacles.delete(`${i}|${j}`)
    }
}

const endTime = performance.now()

console.log(`Result 1 : ${JSON.stringify(result1)}`)
console.log(`Result 2 : ${JSON.stringify(result2)}`)
console.log(`Code took ${endTime - startTime} milliseconds`)