const fs = require('node:fs');


let data = fs.readFileSync(__dirname+'/input.txt', "utf-8")

const startTime = performance.now()

let expanded_data = []
data = data.split("").map(Number)
data.forEach((value, index) => {
    let fill_value = index%2 == 0 ? Math.floor(index/2) : null
    let values = Array(value).fill(fill_value)
    expanded_data.push(...values)
})




let end_index = expanded_data.length - 1

while (end_index > 0) {
    let length = 1
    while (expanded_data[end_index - length] == expanded_data[end_index]) {
        length++
    }
    // console.log(length)

    let start_index = 0
    let moved = false
    while (!moved && (start_index < end_index)) {
        // console.log(start_index, end_index, JSON.stringify(expanded_data))
        while (expanded_data[start_index] != null) {
            start_index++
        }
        if (start_index >= end_index) {
            break
        }

        let valid = true
        for (let i = start_index; i < start_index + length; i++) {
            if (expanded_data[i] != null) {
                valid = false
            }
        }

        if (valid) {
            for (let i = 0; i < length; i++) {
                expanded_data[start_index + i] = expanded_data[end_index - i]
                expanded_data[end_index - i] = null
            }
            moved = true
        }
        else {
            start_index++
        }
    }
    end_index -= length
    while (expanded_data[end_index] == null && end_index > 0) {
        end_index--
    }
}

// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.888899
//   ^                                      ^
// if for i in range(start_index, start_index + length): all case == null -> true
// 00...111...2...333.44.5555.6666.777.888899
//    ^
// then for i in range(0, length)
// expanded_data[start_index + i] = expanded_data[end_index - i]
// start_index += length

// --->
// 0099.111...2...333.44.5555.6666.777.8888..
//     ^                                  ^
// length = 4
// if for i in range(start_index, start_index + length): all case == null -> false

// no space so start_index += length
// 0099.111...2...333.44.5555.6666.777.8888..
//         ^                              ^
// while start_index != null : start_index++
// 0099.111...2...333.44.5555.6666.777.8888..
//         ^                              ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//             ^                          ^
// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.8888..
//             ^                          ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//                 ^                      ^
// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.8888..
//                   ^                    ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//                       ^                ^
// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.8888..
//                           ^            ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//                               ^        ^
// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.8888..
//                                ^       ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//                                    ^   ^
// while start_index != null : start_index++
// 00...111...2...333.44.5555.6666.777.8888..
//                                    ^   ^
// if for i in range(start_index, start_index + length): all case == null -> false
// no space so start_index += length
// 00...111...2...333.44.5555.6666.777.8888..
//                                        ^
// start_index >= end_index -> stop

// start_index = 0
// end_index - length 
// while end_index == null: end_index--
// 00...111...2...333.44.5555.6666.777.8888..
//                                   ^

// start_index++
// console.log(JSON.stringify(expanded_data))

let result = 0
expanded_data.forEach((value, index) => {
    if (value != null) {
        result += value * index
    }
})

const endTime = performance.now()

console.log(JSON.stringify(result))
console.log(`Code took ${endTime - startTime} milliseconds`)
