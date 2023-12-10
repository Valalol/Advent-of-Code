def find_start(lines):
    for i in range(len(lines)):
        line = lines[i]
        for j in range(len(line)):
            if line[j] == "S":
                return (i,j)

def main(data, phase=1):
    lines = data.split("\n")
    start_pos = find_start(lines)
    i, j = start_pos
    loop = [(i, j, "S")]
    coming_from = None
    
    if lines[i][j+1] in ["-", "J", "7"]:
        j += 1
        coming_from = "W"
    elif lines[i][j-1] in ["-", "L", "F"]:
        j -= 1
        coming_from = "E"
    elif lines[i+1][j] in ["|", "L", "J"]:
        i += 1
        coming_from = "N"
    elif lines[i-1][j] in ["|", "F", "7"]:
        i -= 1
        coming_from = "S"
    loop.append((i, j, lines[i][j]))
    
    while lines[i][j] != "S":
        if lines[i][j] == "|":
            if coming_from == "N":
                i += 1
                coming_from = "N"
            elif coming_from == "S":
                i -= 1
                coming_from = "S"
        elif lines[i][j] == "-":
            if coming_from == "E":
                j -= 1
                coming_from = "E"
            elif coming_from == "W":
                j += 1
                coming_from = "W"
        elif lines[i][j] == "J":
            if coming_from == "N":
                j -= 1
                coming_from = "E"
            elif coming_from == "W":
                i -= 1
                coming_from = "S"
        elif lines[i][j] == "L":
            if coming_from == "N":
                j += 1
                coming_from = "W"
            elif coming_from == "E":
                i -= 1
                coming_from = "S"
        elif lines[i][j] == "F":
            if coming_from == "S":
                j += 1
                coming_from = "W"
            elif coming_from == "E":
                i += 1
                coming_from = "N"
        elif lines[i][j] == "7":
            if coming_from == "S":
                j -= 1
                coming_from = "E"
            elif coming_from == "W":
                i += 1
                coming_from = "N"
        loop.append((i, j, lines[i][j]))
    
    if phase == 1:
        return (len(result)-1)//2
    else:
        import matplotlib.pyplot as plt
        import matplotlib.path as mplpath
        import matplotlib.patches as patches
        import numpy as np
        path = []
        for i, j, _ in loop:
            path.append((i, j))
        mpl_path = mplpath.Path(np.array(path))
        
        enclosed_tiles = 0
        for i in range(len(lines)):
            line = lines[i]
            for j in range(len(line)):
                if (i, j) not in path:
                    if mpl_path.contains_point((i, j)):
                        enclosed_tiles += 1
        
        fig = plt.figure()
        ax = fig.add_subplot(111)
        patch = patches.PathPatch(mpl_path, facecolor='orange', lw=2)
        ax.add_patch(patch)
        ax.set_xlim(0, len(lines))
        ax.set_ylim(0, len(lines[0]))
        plt.show()
        
        return enclosed_tiles




if __name__ == "__main__":
    with open("Day10/Day10_data.txt", "r") as file:
        data = file.read()
    
    data_test1 = """..F7.
.FJ|.
SJ.L7
|F--J
LJ..."""

    data_test2 = """...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
..........."""
    
    result = main(data, 2)
    print(result)