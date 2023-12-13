_cache = {}

def cache(func):
    def wrapper(*args):
        args_hashable = (args[0], tuple(args[1]))
        if args_hashable in _cache:
            return _cache[args_hashable]
        else:
            result = func(*args)
            _cache[args_hashable] = result
            return result
    return wrapper


@cache
def recursive_func(text, correct_blocks, depth=0):
    block0 = correct_blocks[0]
    block0_indexes = []
    for i in range(len(text)-block0+1):
        if "." in text[i:i+block0]:
            continue # if there is a . in the block we skip it
        if "#" in text[0:i]:
            continue # if there is a # before the block we skip it
        if i+block0 < len(text):
            if len(correct_blocks) == 1:
                if "#" in text[i+block0:]:
                    continue # if there is a # after the block we skip it
            else:
                if text[i+block0] == "#":
                    continue # if there is a # just after the block since it's not really a block we skip it
        block0_indexes.append(i)
    
    if len(correct_blocks) == 1:
        result = len(block0_indexes)
    else:
        result = 0
        for i in block0_indexes:
            result += recursive_func(text[i+block0+1:], correct_blocks[1:], depth+1)
    # print(f"[{depth}] Result for '{text}' and {correct_blocks}: {result}")
    return result




def parse(data, phase=1):
    parsed_data = []
    lines = data.split("\n")
    for line in lines:
        line = line.split(" ")
        if phase != 1:
            line[0] = "?".join([line[0]]*5)
            line[1] = ",".join([line[1]]*5)
        correct = [int(i) for i in line[1].split(",")]
        parsed_data.append([line[0], correct])
    return parsed_data



def main(data, phase=1):
    data_parsed = parse(data, phase)
    output_value = 0
    for i, line in enumerate(data_parsed):
        print(i)
        result = recursive_func(line[0], line[1])
        output_value += result
    return output_value




if __name__ == "__main__":
    with open("Day12/Day12_data.txt", "r") as file:
        data = file.read()

    data_test = """???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1"""
    
    result = main(data, 2)
    print(result)