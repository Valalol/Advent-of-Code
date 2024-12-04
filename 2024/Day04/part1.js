const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

word = "XMAS"
directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
match_found = 0
data = data.split("\n").map(line => line.split(""))
Xs = data.map((line, line_index) => line.map((letter, col_index) => [letter, line_index, col_index]).filter(element => element[0] == "X")).flat(1)
for (X of Xs) {
    for (direction of directions) {
        index = 0;
        valid = true
        while (valid && ++index < word.length) {
            if (X[1]+index*direction[0] < 0 || X[1]+index*direction[0] >= data.length || X[2]+index*direction[1] < 0 || X[2]+index*direction[1] >= data[0].length || data[X[1]+index*direction[0]][X[2]+index*direction[1]] != word.split("")[index]) valid = false
        }
        if (valid) match_found++
    }
}

const endTime = performance.now()

console.log(JSON.stringify(match_found))
console.log(`Code took ${endTime - startTime} milliseconds`)