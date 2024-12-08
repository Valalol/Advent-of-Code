const fs = require('node:fs');


function rec_check_line(expected_result, accumulator, input_values) {
    if (accumulator > expected_result) return false
    if (input_values.length == 0) {
        return expected_result == accumulator
    } else {
        const current_value = input_values[0];
        return rec_check_line(expected_result, accumulator + current_value, input_values.slice(1))
            || rec_check_line(expected_result, accumulator * current_value, input_values.slice(1))
            || rec_check_line(expected_result, BigInt(`${accumulator}${current_value}`), input_values.slice(1))
    }
}

function check_line(line) {
    let expected_result = line[0]
    let input_values = [...line[1]]
    let first_value = input_values.shift()
    return rec_check_line(expected_result, first_value, input_values)
}

let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split("\n").map(line => line.split(": ").map((element, index) => index == 0 ? BigInt(element) : element.split(" ").map(BigInt)))
let result = data.filter(line => check_line(line)).map(line => line[0]).reduce((partialSum, a) => partialSum + a, BigInt(0))

const endTime = performance.now()

console.log(JSON.stringify(result, (key, value) => typeof value === "bigint" ? Number(value) : value))
console.log(`Code took ${endTime - startTime} milliseconds`)
