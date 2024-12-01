const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")
data = data.split('\r\n').map(line => line.split('   ').map(value => parseInt(value)))

data = data[0].map((_, col_index) => data.map(ligne => ligne[col_index]))

const counter = {};
data[1].forEach(value => { 
    if (counter[value]) { counter[value] += 1; } else { counter[value] = 1; }
})

similarity_scores = data[0].map(value => counter[value] ? value * counter[value] : 0)

sum = similarity_scores.reduce((partialSum, a) => partialSum + a, 0)

console.log(JSON.stringify(sum))