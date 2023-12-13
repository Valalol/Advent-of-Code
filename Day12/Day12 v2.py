
# The objective is to kinda like a nongram with only lines . are empty spaces # are filled spaces and ? are unknown spaces

# let "???.?" be our line and "1,1" be our blocks so here we have 4 possibilities
# we want to do it recursively

# if I put a # in the first ? then the second ? must be empty so the next step is to compute "?.?" and "1" as blocks
# in this case we have 2 possibilities (as we have 2 ?) so we have 2 possibilities

# then we skip the first ? and put # in the second ? so the next step is to compute ".?" and "1" as blocks
# in this case we have 1 possibility (as we have 1 ?) so we have 1 possibility

# then we skip the first two ? and put # in the third ? so the next step is to compute ".?" and "1" as blocks
# in this case we have 1 possibility (as we have 1 ?) so we have 1 possibility

# then we skip the first three ? and put # in the fourth ? so the next step is to compute "" and "1" as blocks
# in this case we have 0 possibility (as we have 0 ?) so we have 0 possibilities

# so we have 2 + 1 + 1 + 0 = 4 possibilities

# so our recursive stop condition is when we have only one block

# each recursive step we can compute the number of possibilities by using a for loop going from 0 to the number of ? in the line
# for each iteration we put a # in the ? and then we compute the number of possibilities of the remaining line and blocks

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
    if len(correct_blocks) == 1:
        blocks = [len(a) for a in text.split(".") if len(a) >= correct_blocks[0]]
        result = sum([block - correct_blocks[0] + 1 for block in blocks])
        # print(f"[{depth}] Result for '{text}' and {correct_blocks}: {result}")
        return result
    else:
        block0 = correct_blocks[0]
        block0_indexes = []
        for i in range(len(text)-block0+1):
            if "." not in text[i:i+block0]:
                if "#" in text[0:i]:
                    continue
                if i+block0 < len(text):
                    if text[i+block0] == "#":
                        continue
                block0_indexes.append(i)
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
    result = 0
    for i, line in enumerate(data_parsed):
        print(i)
        result += recursive_func(line[0], line[1])
    return result




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
    
    # print(main("?###???????? 3,2,1", 2))