
def laser_exiting_the_grid(laser, lines):
    return laser[0] == 0 and laser[2] == "N" or laser[0] == len(lines)-1 and laser[2] == "S" or laser[1] == 0 and laser[2] == "W" or laser[1] == len(lines[0])-1 and laser[2] == "E"



def main(data, phase=1):
    lines = data.split("\n")
    energized = set()
    explored = set((0,0,"E"))
    current_lasers = [(0,0,"E")]
    new_lasers = []
    
    while current_lasers:
        print(current_lasers)
        for laser in current_lasers:
            if laser_exiting_the_grid(laser, lines):
                continue
            energized.add(laser[:2])
            
            match laser[2]:
                case "N":
                    next_case = (laser[0]-1, laser[1])
                    if (next_case[0], next_case[1], "N") in explored:
                        continue
                    explored.add((next_case[0], next_case[1], "N"))
                    match lines[next_case[0]][next_case[1]]:
                        case "." | "|":
                            new_lasers.append((next_case[0], next_case[1], "N"))
                        case "-":
                            new_lasers.append((next_case[0], next_case[1], "E"))
                            new_lasers.append((next_case[0], next_case[1], "W"))
                        case "/":
                            new_lasers.append((next_case[0], next_case[1], "E"))
                        case "\\":
                            new_lasers.append((next_case[0], next_case[1], "W"))
                case "S":
                    next_case = (laser[0]+1, laser[1])
                    if (next_case[0], next_case[1], "S") in explored:
                        continue
                    explored.add((next_case[0], next_case[1], "S"))
                    match lines[laser[0]+1][laser[1]]:
                        case "." | "|":
                            new_lasers.append((next_case[0], next_case[1], "S"))
                        case "-":
                            new_lasers.append((next_case[0], next_case[1], "E"))
                            new_lasers.append((next_case[0], next_case[1], "W"))
                        case "/":
                            new_lasers.append((next_case[0], next_case[1], "W"))
                        case "\\":
                            new_lasers.append((next_case[0], next_case[1], "E"))
                case "E":
                    next_case = (laser[0], laser[1]+1)
                    if (next_case[0], next_case[1], "E") in explored:
                        continue
                    explored.add((next_case[0], next_case[1], "E"))
                    match lines[laser[0]][laser[1]+1]:
                        case "." | "-":
                            new_lasers.append((next_case[0], next_case[1], "E"))
                        case "|":
                            new_lasers.append((next_case[0], next_case[1], "N"))
                            new_lasers.append((next_case[0], next_case[1], "S"))
                        case "/":
                            new_lasers.append((next_case[0], next_case[1], "N"))
                        case "\\":
                            new_lasers.append((next_case[0], next_case[1], "S"))
                case "W":
                    next_case = (laser[0], laser[1]-1)
                    if (next_case[0], next_case[1], "W") in explored:
                        continue
                    explored.add((next_case[0], next_case[1], "W"))
                    match lines[laser[0]][laser[1]-1]:
                        case "." | "-":
                            new_lasers.append((next_case[0], next_case[1], "W"))
                        case "|":
                            new_lasers.append((next_case[0], next_case[1], "N"))
                            new_lasers.append((next_case[0], next_case[1], "S"))
                        case "/":
                            new_lasers.append((next_case[0], next_case[1], "S"))
                        case "\\":
                            new_lasers.append((next_case[0], next_case[1], "N"))
        current_lasers = new_lasers.copy()
        new_lasers = []
    return energized



if __name__ == "__main__":
    with open("Day16/input.txt", "r") as file:
        data = file.read()

    data_test = r""".|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|...."""
    
    result = main(data_test, 1)
    print(result)
    print(len(result))