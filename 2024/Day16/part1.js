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

// function is_finished(state) {
//     return state[0] == end[0] && state[y] == end[x]
// }

// function rotate_clockwise(state) {
//     return [state[0], state[1], (d-1 + 4)%4]
// }
// function rotate_counter_clockwise(state) {
//     return [state[0], state[1], (d+1 + 4)%4]
// }
// function move_forward(state) {
//     let [dx, dy] = directions[state[2]]
//     return [state[0] + dx, state[1] + dy, state[2]]
// }

let graph = {}

for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
        if (grid[x][y] == ".") {
            for (let d = 0; d < 4; d++) {
                graph[`${x}|${y}|${d}`] = {}

                graph[`${x}|${y}|${d}`][`${x}|${y}|${(d+1)%4}`] = 1000
                graph[`${x}|${y}|${d}`][`${x}|${y}|${(d+3)%4}`] = 1000
                let [dx, dy] = directions[d]
                if (grid[x+dx][y+dy] == ".") {
                    graph[`${x}|${y}|${d}`][`${x+dx}|${y+dy}|${d}`] = 1
                }
            }
        }
    }
}

let distances = {}
for (const node in graph) {
    distances[node] = Infinity
}
start = start.join('|')
distances[start] = 0
let predecesseurs = {}


// unvisited nodes
let Q = new Set(Object.keys(graph))
while (Q.size > 0) {
    // Get node with lowest distance
    let min_node = Array.from(Q).map(node => [node, distances[node]]).reduce((prev, current) => prev[1] < current[1] ? prev : current)[0]
    // And remove it from Q
    Q.delete(min_node)

    // for each neighboors of the min_node update the distances
    for (const [neighboor_node, cost] of Object.entries(graph[min_node])) {
        if (distances[neighboor_node] > distances[min_node] + cost) {
            distances[neighboor_node] = distances[min_node] + cost
            predecesseurs[neighboor_node] = min_node
        }
    }
    // if (Q.size%1000 == 0) console.log(Q.size)
}

let result = Math.min(
    distances[`${end[0]}|${end[1]}|0`],
    distances[`${end[0]}|${end[1]}|1`],
    distances[`${end[0]}|${end[1]}|2`],
    distances[`${end[0]}|${end[1]}|3`]
)


const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
