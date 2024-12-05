const fs = require('node:fs');

data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

result = data.split("\n\n")
rules = result[0].split("\n").map(rule => rule.split("|").map(value => parseInt(value)))
books = result[1].split("\n").map(rule => rule.split(",").map(value => parseInt(value)))
incorrect_books = books.filter(book => rules.some(rule => !(book.includes(rule[0]) && book.includes(rule[1]) ? book.findIndex(element => element == rule[0]) < book.findIndex(element => element == rule[1]) : true)))
corrected_books = []
while (incorrect_books.length > 0) {
    for (book of incorrect_books) {
        for (rule of rules) {
            rule0_index = book.findIndex(element => element == rule[0])
            rule1_index = book.findIndex(element => element == rule[1])
            if (!(book.includes(rule[0]) && book.includes(rule[1]) ? rule0_index < rule1_index : true)) {
                let temp = book[rule0_index]
                book[rule0_index] = book[rule1_index]
                book[rule1_index] = temp
            }
        }
        if (rules.every(rule => book.includes(rule[0]) && book.includes(rule[1]) ? book.findIndex(element => element == rule[0]) < book.findIndex(element => element == rule[1]) : true)) {
            incorrect_books.splice(incorrect_books.indexOf(book), 1)
            corrected_books.push(book)
        }
    }
}

result = corrected_books.map(book => book[Math.floor(book.length/2)]).reduce((partialSum, a) => partialSum + a, 0)

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)