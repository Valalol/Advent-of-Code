const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()

let machines = data.split("\n\n").map(machine_str => machine_str.split("\n").map(line => line.split(": ")[1].split(", ").map(value => Number(value.slice(2))))).map(machine_array => {
    let machine = {}
    machine.Ax = machine_array[0][0]
    machine.Ay = machine_array[0][1]
    machine.Bx = machine_array[1][0]
    machine.By = machine_array[1][1]
    machine.X = machine_array[2][0]
    machine.Y = machine_array[2][1]
    return machine
})

let result = 0

for (let machine of machines) {
    let nB = (machine.Y - machine.X * machine.Ay / machine.Ax) / (machine.By - machine.Bx * machine.Ay / machine.Ax)
    let nA = (machine.X - nB * machine.Bx) / machine.Ax
    // console.log() everything : X Y Ax Ay Bx By nA nB
    // console.log(`X: ${machine.X} Y: ${machine.Y} Ax: ${machine.Ax} Ay: ${machine.Ay} Bx: ${machine.Bx} By: ${machine.By} nA: ${nA} nB: ${nB}`)

    if (Math.abs(Math.round(nB) - nB) < 0.001 && Math.abs(Math.round(nA) - nA) < 0.001) {
        // console.log(`Adding ${Math.round(nA)} * 3 + ${Math.round(nB)}`);
        result += Math.round(nA) * 3 + Math.round(nB)
    }
}



const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
