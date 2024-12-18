const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

data = data.split("\n").map(line => line.split(',').map(Number)).map(coordinate => `${coordinate[1]}|${coordinate[0]}`)
let keep_number = 1024
let obstacles = new Set(data.slice(0,keep_number))
let height = 71
let width = 71
let directions = [[0,1], [-1,0], [0,-1], [1,0]]
let start = `0|0`
let end = `70|70`


let graph = {}

for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
        if (!obstacles.has(`${x}|${y}`)) {
            graph[`${x}|${y}`] = {}

            directions.forEach(direction => {
                [dx, dy] = direction
                if (x + dx >= 0 && x + dx < height && y + dy >= 0 && y + dy < width && !obstacles.has(`${x + dx}|${y + dy}`)) {
                    graph[`${x}|${y}`][`${x+dx}|${y+dy}`] = 1
                }
            })
        }
    }
}

let distances = {}
for (const node in graph) {
    distances[node] = Infinity
}
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




let result = distances[end]


const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
