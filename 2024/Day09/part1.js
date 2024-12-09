const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let expanded_data = []
data = data.split("")
data.map(Number).forEach((value, index) => {
    let fill_value = index%2 == 0 ? Math.floor(index/2) : null
    let values = Array(value).fill(fill_value)
    expanded_data.push(...values)
})

let start_index = 0
let end_index = expanded_data.length - 1

while (start_index < end_index) {
    if (expanded_data[start_index] == null) {
        expanded_data[start_index] = expanded_data[end_index]
        expanded_data[end_index] = null

        while (expanded_data[end_index] == null) {
            end_index--
        }
    }
    start_index++
    // console.log(JSON.stringify(expanded_data))
}

let result = 0
expanded_data.forEach((value, index) => {
    if (value != null) {
        result += value * index
    }
})

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
