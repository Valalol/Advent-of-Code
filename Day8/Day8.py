def main(data, phase=1):
    lines = data.split("\n")
    input_commands = list(lines.pop(0))
    lines.pop(0)
    nodes = {}
    for line in lines:
        line_split = line.split(" = ")
        nodes[line_split[0]] = (line_split[1][1:-1].split(", "))
    print(input_commands)
    print(nodes)
    
    i = 0
    node = 'AAA'
    while node != 'ZZZ':
        move = input_commands[i%len(input_commands)]
        if move == 'L':
            node = nodes[node][0]
        else:
            node = nodes[node][1]
        i += 1
    
    return i




if __name__ == "__main__":
    with open("Day8/Day8_data.txt", "r") as file:
        data = file.read()
    
    data_test = """LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)"""
    
    
    
    result = main(data, 1)
    print(result)