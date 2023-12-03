
def parse(data):
    lines = data.split("\n")
    
    parsed_data = []
    
    for i in range(len(lines)):
        line = lines[i]
        j = 0
        
        while j < len(line):
            
            char = line[j]
            
            if char.isdigit():
                number_start_index = j
                number = char
                
                j += 1
                while j < len(line) and line[j].isdigit():
                    number += line[j]
                    j += 1
                number_end_index = j-1
                
                neighboors_list = []
                
                start = number_start_index
                end = number_end_index
                
                
                if number_start_index > 0:
                    start -= 1
                    neighboors_list.append(line[number_start_index-1])
                
                if number_end_index < len(line)-1:
                    end += 1
                    neighboors_list.append(line[number_end_index+1])
                
                if i > 0:
                    neighboors_list.append(lines[i-1][start:end+1])
                
                if i < len(lines)-1:
                    neighboors_list.append(lines[i+1][start:end+1])
                
                
                parsed_data.append([int(number), neighboors_list])
            j += 1
    return parsed_data



def parse2(data):
    lines = data.split("\n")
    
    gears = []
    
    for i in range(len(lines)):
        line = lines[i]
        
        for j in range(len(line)):
            char = line[j]
            
            if char == "*":
                
                neighboors_list = []
                
                start = j
                end = j
                
                
                if j > 0:
                    start -= 1
                    k = j-1
                    text = line[k]
                    while k > 0 and text[0].isdigit():
                        k -= 1
                        text = line[k] + text
                    neighboors_list.append(text)
                
                if j < len(line)-1:
                    end += 1
                    k = j+1
                    text = line[k]
                    while k < len(line)-1 and text[-1].isdigit():
                        k += 1
                        text += line[k]
                    neighboors_list.append(text)
                
                if i > 0:
                    text = lines[i-1][start:end+1]
                    
                    k = start
                    while k > 0 and text[0].isdigit():
                        k -= 1
                        text = lines[i-1][k] + text
                    
                    k = end
                    while k < len(line)-1 and text[-1].isdigit():
                        k += 1
                        text += lines[i-1][k]
                    
                    neighboors_list.append(text)
                
                if i < len(lines)-1:
                    text = lines[i+1][start:end+1]
                    
                    k = start
                    while k > 0 and text[0].isdigit():
                        k -= 1
                        text = lines[i+1][k] + text
                    
                    k = end
                    while k < len(line)-1 and text[-1].isdigit():
                        k += 1
                        text += lines[i+1][k]
                    
                    neighboors_list.append(text)
                
                gears.append(neighboors_list)
    
    
    return gears


def main1(data):
    parsed_data = parse(data)
    ignored_char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    numbers = []
    for i in parsed_data:
        value = i[0]
        neighboors = i[1]
        for neighboor in neighboors:
            for char in ignored_char:
                neighboor = neighboor.replace(char, "")
            if neighboor != "":
                numbers.append(value)
    return sum(numbers)



def main2(data):
    gears = parse2(data)
    ignored_char = ["*", "/", "+", "-", "$", "@", "#", "&", "%", "!", "?", "(", ")", "[", "]", "{", "}", "<", ">", "|", "\\", "^", "~", "`", ":", ";", ",", "_", "=", '"', "'", " "]
    correct_gears = []
    for gear in gears:
        values = []
        for number in gear:
            for value in number.split("."):
                if not len(value) == 0:
                    for char in ignored_char:
                        value = value.replace(char, "")
                    if value != "":
                        values.append(int(value))
        if len(values) == 2:
            correct_gears.append(values)
    
    output = 0
    for gear in correct_gears:
        output += gear[0] * gear[1]
    
    return output


if __name__ == "__main__":
    with open("Day3_data.txt", "r") as file:
        data = file.read()
    
    data_test = """467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598.."""
    
    result = main2(data)
    print(result)


