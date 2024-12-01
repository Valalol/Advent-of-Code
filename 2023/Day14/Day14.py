def fall_rocks(column):
    for i in range(len(column)):
        char = column[i]
        if char == "O":
            j = i - 1
            while j >= 0 and column[j] == ".":
                column[j] = "O"
                column[j+1] = "."
                j -= 1
    return column

def count_load(lines):
    total = 0
    for i in range(len(lines)):
        line = lines[i]
        for char in line:
            if char == "O":
                total += len(lines)-i   
    return total

def tilt(lines, side):
    if side == "N":
        columns = [list(i) for i in zip(*lines)]
        tilted_columns = [fall_rocks(i) for i in columns]
        tilted_lines = [list(i) for i in zip(*tilted_columns)]
        return tilted_lines
    if side == "S":
        columns = [list(i) for i in zip(*lines)]
        tilted_columns = [fall_rocks(i[::-1]) for i in columns]
        tilted_columns = [i[::-1] for i in tilted_columns]
        tilted_lines = [list(i) for i in zip(*tilted_columns)]
        return tilted_lines
    
    if side == "W":
        tilted_lines = [fall_rocks(i) for i in lines]
        return tilted_lines
    if side == "E":
        tilted_lines = [fall_rocks(i[::-1]) for i in lines]
        tilted_lines = [i[::-1] for i in tilted_lines]
        return tilted_lines

_cache = {}

def cache(func):
    def wrapper(*args):
        args_hashable = tuple(tuple(i) for i in args[0])
        if args_hashable in _cache:
            return _cache[args_hashable]
        else:
            result = func(*args)
            _cache[args_hashable] = result
            return result
    return wrapper

@cache
def cycle(lines):
    lines = tilt(lines, "N")
    lines = tilt(lines, "W")
    lines = tilt(lines, "S")
    lines = tilt(lines, "E")
    return lines


def pretty_print(data):
    print("--------")
    for line in data:
        print("".join(line))
    print("--------")
    print()


def main(data, phase=1):
    lines = [list(line) for line in data.split("\n")]
    pretty_print(lines)
    cycles = 1000000000
    previous_lines = []
    for i in range(cycles):
        lines = cycle(lines)
        if lines in previous_lines:
            delta = i - previous_lines.index(lines)
            remaining = (cycles-i)%delta
            break
        else:
            previous_lines.append(lines)
            i -= 1
    
    for i in range(remaining-1):
        lines = cycle(lines)
    
    pretty_print(lines)
    load = count_load(lines)
    return(load)



if __name__ == "__main__":
    with open("Day14/input.txt", "r") as file:
        data = file.read()

    data_test = """O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#...."""
    
    result = main(data)
    print(result)