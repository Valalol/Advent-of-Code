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



const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
