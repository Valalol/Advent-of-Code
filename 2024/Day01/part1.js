const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")
data = data.split('\r\n').map(line => line.split('   ').map(value => parseInt(value)))

data = data[0].map((_, col_index) => data.map(ligne => ligne[col_index]))

data.map(list => list.sort((a,b) => a - b))

diffs = data[0].map((_,i) => Math.abs(data[0][i] - data[1][i]));
sum = diffs.reduce((partialSum, a) => partialSum + a, 0)

console.log(JSON.stringify(sum))