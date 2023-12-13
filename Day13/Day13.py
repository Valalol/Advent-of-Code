
def check_mirror(lines, i):
    j = i+1
    errors = 0
    while i >= 0 and j <= len(lines)-1:
        for k in range(len(lines[0])):
            if lines[i][k] != lines[j][k]:
                errors += 1
            if errors > 1:
                return False
        i -= 1
        j += 1
    return errors == 1

def find_mirrors(lines):
    for i in range(len(lines)-1):
        if check_mirror(lines,i):
            return i+1
    return None


def main(data, phase=1):
    horizontal_lines = []
    vertical_lines = []
    for pattern in data.split("\n\n"):
        pattern_lines = pattern.split("\n")
        horizontal_result = find_mirrors(pattern_lines)
        if horizontal_result is not None:
            horizontal_lines.append(horizontal_result)
            print(f"{pattern}\nHorizontal {horizontal_result}\n")
        else:
            pattern_columns = [[pattern_lines[j][i] for j in range(len(pattern_lines))] for i in range(len(pattern_lines[0]))]
            vertical_result = find_mirrors(pattern_columns)
            if vertical_result is not None:
                vertical_lines.append(vertical_result)
                print(f"{pattern}\nVertical {vertical_result}\n")
            else:
                raise Exception("No mirror found")

    # print(horizontal_lines, vertical_lines)
    return 100*sum(horizontal_lines) + sum(vertical_lines)



if __name__ == "__main__":
    with open("Day13/input.txt", "r") as file:
        data = file.read()

    data_test = """#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#"""
    
    result = main(data)
    print(result)