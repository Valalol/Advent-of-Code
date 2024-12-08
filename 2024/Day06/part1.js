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

function draw_grid(width, height, grid, gardien, cases_parcourues) {
    output_text = ""
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (i == gardien[1] && j == gardien[2]) {
                output_text += "@"
            } else if (cases_parcourues.some(element => element[0] == i && element[1] == j)) {
                output_text += "X"
            } else {
                output_text += grid.find(element => element[1] == i && element[2] == j)[0]
            }
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

let startTime = performance.now()


// let grid = data.split("\n").map((line, line_index) => line.split("").map((element, col_index) => [element, line_index, col_index])).flat(1)

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

cases_parcourues = new Set()
cases_parcourues.add(`${gardien[1]}|${gardien[2]}`)
while (gardien = calc_new_state(obstacles, gardien, width, height)) {
    if (!cases_parcourues.has(`${gardien[1]}|${gardien[2]}`)) {
        cases_parcourues.add(`${gardien[1]}|${gardien[2]}`)
    }
}
result = cases_parcourues.size

let endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)