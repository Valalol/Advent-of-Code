const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

data = data.split("\n")
let A = Number(data[0].split(": ")[1])
let B = Number(data[1].split(": ")[1])
let C = Number(data[2].split(": ")[1])
let instructions = data[4].split(": ")[1].split(",").map(Number)


function combo_operands(operand) {
    if (operand >= 0 && operand < 4) {
        return operand
    } else if (operand == 4) {
        return A
    } else if (operand == 5) {
        return B
    } else if (operand == 6) {
        return C
    } else if (operand == 7) {
        console.log("Uh wut ??")
        return -1
    }
}

function process_op_code(op_code, operand) {
    switch (op_code) {
        case 0:
            A = Math.floor(A / 2**combo_operands(operand))
            instruction_pointer += 2
            break
        case 1:
            B ^= operand
            instruction_pointer += 2
            break
        case 2:
            B = combo_operands(operand)%8
            instruction_pointer += 2
            break
        case 3:
            if (A != 0) instruction_pointer = operand
            else instruction_pointer += 2
            break
        case 4:
            B ^= C
            instruction_pointer += 2
            break
        case 5:
            out.push(combo_operands(operand)%8)
            instruction_pointer += 2
            break
        case 6:
            B = Math.floor(A / 2**combo_operands(operand))
            instruction_pointer += 2
            break
        case 7:
            C = Math.floor(A / 2**combo_operands(operand))
            instruction_pointer += 2
            break
    }
}

let out = []
let instruction_pointer = 0
while (instruction_pointer < instructions.length) {
    process_op_code(instructions[instruction_pointer], instructions[instruction_pointer + 1])
}

let result = out.join(',')


const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
