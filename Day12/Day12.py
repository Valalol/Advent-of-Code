def parse(data):
    parsed_data = []
    lines = data.split("\n")
    for line in lines:
        line = line.split(" ")
        line[0] = "?".join([line[0]]*5)
        line[1] = ",".join([line[1]]*5)
        correct = [int(i) for i in line[1].split(",")]
        index_unknown = [i for i, x in enumerate(line[0]) if x == "?"]
        parsed_data.append([index_unknown, line[0], correct])
    return parsed_data


def process_func(lines, queue=None):
    possibilities = []
    for line in lines:
        line_possibilities = 0
        print(2**len(line[0]))
        for i in range(2**len(line[0])):
            binary_number_list = list(bin(i)[2:])
            binary_number_list_completed = ["0"] * (len(line[0]) - len(binary_number_list)) + binary_number_list
            combination = ["#" if i == "1" else "." for i in binary_number_list_completed]
            text = list(line[1])
            for j in range(len(line[0])):
                text[line[0][j]] = combination[j]
            text = "".join(text)
            splits = [len(a) for a in text.split(".") if len(a) > 0]
            if splits == line[2]:
                # print(text, splits, line[2])
                line_possibilities += 1
        possibilities.append(line_possibilities)
    if queue:
        queue.put(sum(possibilities))
    return sum(possibilities)


def main(data, phase=1, mode="normal"):
    parsed_data = parse(data)
    print(parsed_data)
    
    
    import time
    origin_time = time.time()
    if mode == "normal":
        possibilities = process_func(parsed_data)
    
    elif mode == "multiprocessing":
        from multiprocessing import Process, Queue
        processes = []
        
        amount = 10
        for i in range(0, amount):
            queue = Queue()
            process = Process(target=process_func, args=(parsed_data[i*len(parsed_data)//amount:(i+1)*len(parsed_data)//amount], queue))
            process.start()
            processes.append((process, queue))
        
        possibilities = 0
        for process, queue in processes:
            possibilities += queue.get()
            process.join()
    
    time_interval = time.time() - origin_time
    print(f"Time: {time_interval:.2f}s")
    
    return possibilities



if __name__ == "__main__":
    with open("Day12/Day12_data.txt", "r") as file:
        data = file.read()

    data_test = """???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1"""
    
    result = main(data, mode="multiprocessing")
    print(result)
