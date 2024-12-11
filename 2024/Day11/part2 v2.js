const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

// console.profile()
const startTime = performance.now()


function process_stone(stone) {
    if (stone == 0) return [1]
    let stone_str = `${stone}`
    let stone_length = stone_str.length
    if (stone_length%2 == 0) {
        return [Number(stone_str.slice(0, stone_length / 2)), Number(stone_str.slice(stone_length / 2, stone_length))]
    } else return [stone*2024]
}


let stones = data.split(" ").map(Number)
let stones_map = {}
stones.forEach(stone => stones_map[stone] ? stones_map[stone]++ : stones_map[stone] = 1)


for (let blink = 0; blink < 75; blink++) {
    let new_stones_map = {}
    Object.entries(stones_map).forEach(([stone, amount]) => {
        let new_stones = process_stone(stone)
        new_stones.forEach(new_stone => new_stones_map[new_stone] ? new_stones_map[new_stone] += amount : new_stones_map[new_stone] = amount)
    });
    stones_map = new_stones_map
}

result = 0
Object.entries(stones_map).forEach(([key, amount]) => result += amount)


const endTime = performance.now()
// console.profileEnd()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
