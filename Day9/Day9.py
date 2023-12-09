def parse(data, phase=1):
    data_parsed = []
    for line in data.split("\n"):
        line_values = []
        for value in line.split(" "):
            line_values.append(int(value))
        data_parsed.append(line_values)
    return data_parsed

def main(data, phase=1):
    data_parsed = parse(data, phase=1)
    
    return_value = 0
    
    for sequence in data_parsed:
        histories = [sequence]
        while any(histories[-1]):
            previous_history = histories[-1]
            new_history = [previous_history[i] - previous_history[i-1] for i in range(1, len(previous_history))]
            histories.append(new_history)
        # print(histories)
        
        for i in range(len(histories)-1):
            modify = len(histories)-2-i
            if phase == 1:
                histories[modify].append(histories[modify][-1]+histories[modify+1][-1])
            else:
                histories[modify].insert(0, histories[modify][0]-histories[modify+1][0])
        print(histories)
        
        if phase == 1:
            return_value += histories[0][-1]
        else:
            return_value += histories[0][0]
    
    return return_value




if __name__ == "__main__":
    with open("Day9/Day9_data.txt", "r") as file:
        data = file.read()
    
    data_test = """0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45"""
    
    
    result = main(data, 2)
    print(result)