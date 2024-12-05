const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

data = data.split("\n\n")
rules = data[0].split("\n").map(rule => rule.split("|").map(value => parseInt(value)))
books = data[1].split("\n").map(rule => rule.split(",").map(value => parseInt(value)))
correct_books = books.filter(book => rules.every(rule => book.includes(rule[0]) && book.includes(rule[1]) ? book.findIndex(element => element == rule[0]) < book.findIndex(element => element == rule[1]) : true))
result = correct_books.map(book => book[Math.floor(book.length/2)]).reduce((partialSum, a) => partialSum + a, 0)

const endTime = performance.now()

console.log(JSON.stringify(correct_books))
console.log(`Code took ${endTime - startTime} milliseconds`)