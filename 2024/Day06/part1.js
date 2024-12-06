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
let gardien = [...grid.filter(element => element[0] == "^")[0]]
grid[grid.findIndex(element => element[1] == gardien[1] && element[2] == gardien[2])][0] = "."
gardien[0] = directions_str.findIndex(element => element == gardien[0])


cases_parcourues = [[gardien[1], gardien[2]]]
index = 0;
while (gardien = calc_new_state(obstacles, gardien, width, height, directions)) {
    if (cases_parcourues.every(element => element[0] != gardien[1] || element[1] != gardien[2])) {
        cases_parcourues.push([gardien[1], gardien[2]])
        // if (index%50 == 0) {
        //     // draw_grid(width, height, grid, gardien, cases_parcourues)
        //     // await new Promise(r => setTimeout(r, 10));
        // }
    }
    index++;
}
result = cases_parcourues.length
// draw_grid(width, height, grid, gardien, cases_parcourues)


const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)