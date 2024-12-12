const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let stones = data.split(" ").map(Number)

function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (!cache[key]) {
            cache[key] = fn.apply(this, args);
            return cache[key];
        } else {
            // console.log(`New hit: ${key}`);
            return cache[key];
        }
    };
}


function rec_count_stones(stone, blink_left) {
    if (blink_left == 0) return 1

    let new_stones = []
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

    let current_amount = new_stones.map(stone => memoized_rec_count_stones(stone, blink_left - 1)).reduce((partial_sum, value) => partial_sum + value, 0)
    return current_amount
}

const memoized_rec_count_stones = memoize(rec_count_stones);

let result = 0
for (let stone of stones) {
    result += memoized_rec_count_stones(stone, 75)
    // console.log(`Stone ${stone} done ! Current result : ${result}`);
}


const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
