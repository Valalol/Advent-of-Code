def laser_exiting_the_grid(laser, lines):
    return laser[0] == 0 and laser[2] == "N" or laser[0] == len(lines)-1 and laser[2] == "S" or laser[1] == 0 and laser[2] == "W" or laser[1] == len(lines[0])-1 and laser[2] == "E"


def main(data, phase=1, visualize_bool=False):
    lines = data.split("\n")
    
    if visualize_bool:
        global img
        img = Image.new("RGB", (len(lines)*5, len(lines[0])*5), color="white")
    
    if phase == 1:
        return len(test(lines, (0, -1, "E"), visualize_bool))
    
    elif phase == 2:
        maximum = 0
        best_start_pos = None
        
        x = len(lines)
        y = len(lines[0])
        
        for i in range(x):
            start_pos = (i, -1, "E")
            result = test(lines, start_pos)
            if len(result) > maximum:
                maximum = len(result)
                best_start_pos = start_pos
                print(f"New maximum : {maximum}, start pos : {best_start_pos}")
            
            start_pos = (i, y, "W")
            result = test(lines, start_pos)
            if len(result) > maximum:
                maximum = len(result)
                best_start_pos = start_pos
                print(f"New maximum : {maximum}, start pos : {best_start_pos}")
        
        for i in range(y):
            start_pos = (-1, i, "S")
            result = test(lines, start_pos)
            if len(result) > maximum:
                maximum = len(result)
                best_start_pos = start_pos
                print(f"New maximum : {maximum}, start pos : {best_start_pos}")
            
            start_pos = (x, i, "N")
            result = test(lines, start_pos)
            if len(result) > maximum:
                maximum = len(result)
                best_start_pos = start_pos
                print(f"New maximum : {maximum}, start pos : {best_start_pos}")
        
        return maximum


def test(lines, start, visualize_bool = False):
    energized = set()
    old_energized = set()
    explored = set()
    current_lasers = [start]
    new_lasers = []
    
    
    counter = 0
    while current_lasers:
        # print(current_lasers)
        for laser in current_lasers:
            if laser[0] in range(len(lines)) and laser[1] in range(len(lines[0])):
                energized.add(laser[:2])
            
            if laser_exiting_the_grid(laser, lines):
                continue
            
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
                    
                    match lines[laser[0]+1][next_case[1]]:
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
                    
                    match lines[laser[0]][next_case[1]]:
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
                    
                    match lines[next_case[0]][next_case[1]]:
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
        counter += 1
        new_nergized = energized.difference(old_energized)
        old_energized = energized.copy()
        if visualize_bool:
            visualize(new_nergized, (len(lines), len(lines[0])), counter)
    
    return energized


def visualize(result, size, counter):
    x,y = size
    global img
    new_img = img.copy()
    draw = ImageDraw.Draw(new_img)
    for i in range(x+1):
        for j in range(y+1):
            if (j,i) in result:
                color = hsv_to_rgb(counter/200, 1, 1)
                color = tuple(int(u*255) for u in color)
                draw.rectangle((i*5,j*5,i*5+4,j*5+4), fill=color)
    images.append(new_img)
    img = new_img


def create_gif():
    images[0].save("Day16/Day16.gif", save_all=True, append_images=images[1:], duration=20, loop=0)


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

    visualize_bool = True
    if visualize_bool:
        from colorsys import hsv_to_rgb
        from PIL import Image, ImageDraw
        images = []
        img = None

    
    result = main(data, 1, visualize_bool)
    print(result)
    
    if visualize_bool:
        create_gif()

