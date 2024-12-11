const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

stones = data.split(" ").map(Number)

for (let i = 0; i < 25; i++) {
    let new_stones = []
    stones.forEach(stone => {
        if (stone == 0) {
            new_stones.push(1)
        } else {
            let stone_str = `${stone}`
            let stone_length = stone_str.length
            if (stone_length%2 == 0) {
                new_stones.push(Number(stone_str.slice(0, stone_length / 2)))
                new_stones.push(Number(stone_str.slice(stone_length / 2, stone_length)))
            } else {
                new_stones.push(stone*2024)
            }
        }
    })
    stones = new_stones
    // console.log(`Blink ${i+1}, current amount of stones : ${stones.length.toLocaleString('fr-FR')}`);
}


const endTime = performance.now()

console.log(JSON.stringify(stones.length))
console.log(`Code took ${endTime - startTime} milliseconds`)
