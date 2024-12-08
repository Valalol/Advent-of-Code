const fs = require('node:fs');


// 49: 2 5 2 7
// rec_check_line 98 2 [5 2 7] -> true

// rec_check_line 98 10 [2 7]
// --------------------------
// rec_check_line 98 7 [2 7] -> true

// rec_check_line 98 20 [7]
// rec_check_line 98 12 [7]
// --------------------------
// rec_check_line 98 14 [7] -> true
// rec_check_line 98 9 [7]

// rec_check_line 98 140 [] -> false
// rec_check_line 98 27 [] -> false
// rec_check_line 98 84 [] -> false
// rec_check_line 98 19 [] -> false
// --------------------------
// rec_check_line 98 98 [] -> true
// rec_check_line 98 21 [] -> false
// rec_check_line 98 63 [] -> false
// rec_check_line 98 16 [] -> false



function rec_check_line(expected_result, accumulator, input_values) {
    if (accumulator > expected_result) return false
    if (input_values.length == 0) {
        return expected_result == accumulator
    } else {
        let local_input_values = [...input_values]
        const current_value = local_input_values.shift();
        return rec_check_line(expected_result, accumulator + current_value, local_input_values) || rec_check_line(expected_result, accumulator * current_value, local_input_values)
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
