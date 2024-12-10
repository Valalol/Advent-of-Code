const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split("\n").map(line => line.split("").map(Number))


let height = data.length
let width = data[0].length
let trailheads = []

for (let line_index = 0; line_index < height; line_index++) {
    let line = data[line_index]
    for (let col_index = 0; col_index < width; col_index++) {
        element = line[col_index]
        if (element == 0) {
            trailheads.push([line_index, col_index])
        }
    }
}

function rec_search_path(old_value, x, y) {
    // console.log(`Current cell : (${x},${y}) : ${data[x][y]}, Looking for ${old_value + 1}`);
    if (data[x][y] != old_value + 1 || data[x][y] == NaN) {
        return []
    }
    if (data[x][y] == 9) {
        // console.log("found", x, y)
        return [[x, y]]
    }
    let return_value = []
    if (x > 0) return_value.push(...rec_search_path(old_value + 1, x - 1, y))
    if (x < height - 1) return_value.push(...rec_search_path(old_value + 1, x + 1, y))
    if (y > 0) return_value.push(...rec_search_path(old_value + 1, x, y - 1))
    if (y < width - 1) return_value.push(...rec_search_path(old_value + 1, x, y + 1))
    return return_value
}

let trail_scores = trailheads.map(trailhead => rec_search_path(-1, trailhead[0], trailhead[1])).map(trail_ends => {
    let ends = new Set()
    trail_ends.forEach(trail_end => {
        if (!ends.has(`${trail_end[0]}${trail_end[1]}`)) {
            ends.add(`${trail_end[0]}${trail_end[1]}`)
        }
    })
    return ends.size
})

let result = trail_scores.reduce((partial_sum, value) => partial_sum + value, 0)

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
