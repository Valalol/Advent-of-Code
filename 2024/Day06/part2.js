const fs = require('node:fs');


function is_leaving(new_position, width, height) {
    return (new_position[0] < 0 || new_position[0] >= height || new_position[1] < 0 || new_position[1] >= width)
}

function calc_new_state(obstacles, gardien, width, height, directions) {
    let déplacement = directions[gardien[0]]
    let new_position = [gardien[1]+déplacement[0], gardien[2]+déplacement[1]]
    if (is_leaving(new_position, width, height)) {
        return false
    } else if (obstacles.some(element => element[0] == new_position[0] && element[1] == new_position[1])) {
        return [(gardien[0]+1)%4, gardien[1], gardien[2]]
    } else {
        return [gardien[0], new_position[0], new_position[1]]
    }
}

function draw_grid(width, height, grid, gardien, cases_parcourues) {
    output_text = ""
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (i == gardien[1] && j == gardien[j]) {
                output_text += "@"
            } else if (cases_parcourues.some(element => element[0] == i && element[1] == j)) {
                output_text += "X"
            } else (
                output_text += grid.find(element => element[1] == i && element[2] == j)[0]
            )
            output_text += "  "
        }
        output_text += "\n"
    }
    // console.log(output_text)
    fs.writeFile(__dirname+'/visualisation.txt', output_text, err => {
        if (err) {
            console.error(err);
        }
    });
}

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let grid = data.split("\n").map((line, line_index) => line.split("").map((element, col_index) => [element, line_index, col_index])).flat(1)
let height = data.split("\n").length
let width = data.split("\n")[0].split("").length
let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
let directions_str = ["^", ">", "v", "<"]
let obstacles = grid.filter(element => element[0] == "#").map(element => [element[1], element[2]])
let gardien = [...grid.filter(element => element[0] != "." && element[0] != "#")[0]]
grid[grid.findIndex(element => element[1] == gardien[1] && element[2] == gardien[2])][0] = "."
gardien[0] = directions_str.findIndex(element => element == gardien[0])


let result = 0
for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        // check if no obstacle at (i, j)
        // else pass
        if (obstacles.every(obstacle => obstacle[0] != i || obstacle[1] != j) && (gardien[1] != i || gardien[2] != j)) {
            // add new_obstacle to obstacle list and save it to a new obstacle list
            modified_obstacles = obstacles.concat([[i,j]])
            modified_gardien = [...gardien]

            past_state = []
            while (modified_gardien = calc_new_state(modified_obstacles, modified_gardien, width, height, directions)) {
                if (past_state.some(element => element[0] == modified_gardien[0] && element[1] == modified_gardien[1] && element[2] == modified_gardien[2])) {
                    result++
                    break
                } else {
                    past_state.push([...modified_gardien])
                }
            }
        }
    }
    console.log(`Line ${i} done, actual result : ${result}`)
}

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)