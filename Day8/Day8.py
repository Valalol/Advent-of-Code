def gcd(a, b):
    while b>0:
        a, b = b, a%b
    return a

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
    
    if phase == 1:
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
    
    
    if phase == 2:
        node_list = []
        for node in nodes:
            if node[-1] == "A":
                node_list.append(node)
        
        turns_list = []
        
        for node in node_list:
            i = 0
            while node[-1] != 'Z':
                move = input_commands[i%len(input_commands)]
                if move == 'L':
                    node = nodes[node][0]
                else:
                    node = nodes[node][1]
                i += 1
            turns_list.append(i)
        
        ppcm = turns_list[0]
        for i in range(1, len(turns_list)):
            ppcm = int(ppcm*turns_list[i] / gcd(ppcm, turns_list[i]))
        
        return ppcm




if __name__ == "__main__":
    with open("Day8/input.txt", "r") as file:
        data = file.read()
    
    data_test = """LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)"""
    
    
    
    result = main(data, 2)
    print(result)