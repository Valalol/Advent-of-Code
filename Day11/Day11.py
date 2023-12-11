def expand(data):
    data_parsed = data.split("\n")
    
    expanded_horizontally_data = [[] for _ in range(len(data_parsed))]
    
    for i in range(len(data_parsed[0])):
        column = [data_parsed[a][i] for a in range(len(data_parsed))]
        
        for a in range(len(column)):
            expanded_horizontally_data[a].append(column[a])
            if not "#" in column:
                for _ in range(2-1):
                    expanded_horizontally_data[a].append(column[a])
    
    
    expanded_vertically_data = []
    
    for i in range(len(expanded_horizontally_data)):
        line = expanded_horizontally_data[i]
        expanded_vertically_data.append(line)
        if not "#" in line:
            for _ in range(2-1):
                expanded_vertically_data.append(line)
    
    return expanded_vertically_data

def prettyprint(data_parsed):
    text = "\n".join(["".join(data_parsed[i]) for i in range(len(data_parsed))])
    print(text)

def main(data):
    expanded_data = expand(data)
    galaxies = []
    for i in range(len(expanded_data)):
        for j in range(len(expanded_data[0])):
            if expanded_data[i][j] == "#":
                galaxies.append((i,j))
    
    print(galaxies)
    
    total_distance = 0
    for i in range(len(galaxies)-1):
        for j in range(i+1,len(galaxies)):
            galaxy_a = galaxies[i]
            galaxy_b = galaxies[j]
            distance = abs(galaxy_a[0] - galaxy_b[0]) + abs(galaxy_a[1] - galaxy_b[1])
            total_distance += distance
    
    return total_distance




if __name__ == "__main__":
    with open("Day11/Day11_data.txt", "r") as file:
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
    
    result = main(data_test)
    print(result)