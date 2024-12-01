def expand(galaxies, size):
    import copy
    
    max_x, max_y = size
    output_galaxies = copy.deepcopy(galaxies)
    galaxies_x = [g[0] for g in galaxies]
    galaxies_y = [g[1] for g in galaxies]
    
    offset = 1000000-1
    
    for x in range(max_x):
        if not x in galaxies_x:
            for i in range(len(galaxies)):
                if galaxies[i][0] > x:
                    output_galaxies[i][0] += offset
    for y in range(max_y):
        if not y in galaxies_y:
            for i in range(len(galaxies)):
                if galaxies[i][1] > y:
                    output_galaxies[i][1] += offset
    
    return output_galaxies

def main(data):
    data = data.split("\n")
    galaxies = []
    for i in range(len(data)):
        for j in range(len(data[0])):
            if data[i][j] == "#":
                galaxies.append([i,j])
    
    print(galaxies)
    expanded_galaxies = expand(galaxies, (len(data), len(data[0])))
    print(expanded_galaxies)
    
    total_distance = 0
    for i in range(len(expanded_galaxies)-1):
        for j in range(i+1,len(expanded_galaxies)):
            galaxy_a = expanded_galaxies[i]
            galaxy_b = expanded_galaxies[j]
            distance = abs(galaxy_a[0] - galaxy_b[0]) + abs(galaxy_a[1] - galaxy_b[1])
            total_distance += distance
    
    return total_distance




if __name__ == "__main__":
    with open("Day11/input.txt", "r") as file:
        data = file.read()
    
    

    data_test = """...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#....."""
    
    result = main(data)
    print(result)