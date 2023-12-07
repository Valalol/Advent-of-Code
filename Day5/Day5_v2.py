

def remap(input_map, input_range):
    # let a b be a range of seeds
    # let f(x) be the function applied to the range
    # let r_a, r_b be the range where f(x) is applied Ex [5, 25]
    # start : [[a, b]] 
    # multiples cases
    
    
    # 1 : r_a <= a < b <= r_b
    #     [[f(a), f(b)]]
    #     [10, 20] -> [[f(10), f(20)]]
    
    # 2 : a < r_a <= b <= r_b
    #     [[a, r_a-1], [f(r_a), f(b)]]
    #     [0, 10] -> [[0, 4], [f(5), f(10)]]
    #     [0, 5] -> [[0, 4], [f(5), f(5)]]
    
    # 3 : r_a <= a <= r_b < b
    #     [[f(a), f(r_b)], [r_b+1, b]]
    #     [20, 30] -> [[f(20), f(25)], [26, 30]]
    #     [25, 30] -> [[f(25), f(25)], [26, 30]]
    
    # 4 : a < r_a <= r_b < b
    #     [[a, r_a-1], [f(r_a), f(r_b)], [r_b+1, b]]
    #     [0, 30] -> [[0, 4], [f(5), f(25)], [26, 30]]
    
    # 5 : r_b < a
    #     [[a, b]]
    #     [40, 50] -> [[40, 50]]
    
    # 6 : b < r_a
    #    [[a, b]]
    #    [0, 4] -> [[0, 4]]
    
    def f(x, offset):
        return x + offset
    
    
    processed_ranges = []
    unprocessed_ranges = [input_range]
    for selected_range in input_map:
        r_a, r_b = selected_range[0]
        offset = selected_range[1]
        
        for _ in range(len(unprocessed_ranges)):
            a, b = unprocessed_ranges.pop(0)
            
            if r_a <= a and b <= r_b:
                processed_ranges.append([a + offset, b + offset])
            
            elif a < r_a and r_a <= b and b <= r_b:
                unprocessed_ranges.append([a, r_a-1])
                processed_ranges.append([f(r_a, offset), f(b, offset)])
            
            elif r_a <= a and a <= r_b and r_b < b:
                unprocessed_ranges.append([r_b+1, b])
                processed_ranges.append([f(a, offset), f(r_b, offset)])
            
            elif a < r_a and r_a <= r_b and r_b < b:
                unprocessed_ranges.append([a, r_a-1])
                unprocessed_ranges.append([r_b+1, b])
                processed_ranges.append([f(r_a, offset), f(r_b, offset)])
            
            elif b < r_a:
                unprocessed_ranges.append([a, b])
            
            elif r_b < a:
                unprocessed_ranges.append([a, b])
            
            else:
                raise Exception("Unknown case")
    
    return processed_ranges + unprocessed_ranges




def main(data):
    seed_to_soil_map = []
    soil_to_fertilizer_map = []
    fertilizer_to_water_map = []
    water_to_light_map = []
    light_to_temperature_map = []
    temperature_to_humidity_map = []
    humidity_to_location_map = []
    
    maps = {
        "seed-to-soil map": seed_to_soil_map,
        "soil-to-fertilizer map": soil_to_fertilizer_map,
        "fertilizer-to-water map": fertilizer_to_water_map,
        "water-to-light map": water_to_light_map,
        "light-to-temperature map": light_to_temperature_map,
        "temperature-to-humidity map": temperature_to_humidity_map,
        "humidity-to-location map": humidity_to_location_map
    }
    
    for key in maps.keys():
        liste = maps[key]
        for line in data[key].split("\n"):
            values = line.split(" ")
            values = [int(value) for value in values]
            liste.append(((values[1], values[1]+values[2]), values[0] - values[1]))
    
    # create the ranges of seeds
    seeds_raw = data["seeds"].split(" ")
    seeds_ranges = []
    for i in range(len(seeds_raw)//2):
        seeds_ranges.append([int(seeds_raw[2*i]), int(seeds_raw[2*i])+int(seeds_raw[2*i+1])])
    
    # get the initial ranges of seeds
    # pass each of them through the first map (apply a function to the range) and detect the split in the ranges
    # do this for each maps
    # the last map will give us the location ranges
    # final step is to find the minimal location within these ranges
    
    actual_ranges = seeds_ranges
    # print(actual_ranges)
    for key in maps.keys():
        actual_map = maps[key]
        new_ranges = []
        for process_range in actual_ranges:
            remap_ranges = remap(actual_map, process_range)
            for new_range in remap_ranges:
                new_ranges.append(new_range)
        actual_ranges = new_ranges
    
    # print(actual_ranges)
    miminum = min([a[0] for a in actual_ranges])
    return miminum - 1




if __name__ == "__main__":
    with open("Day5/Day5_data.txt") as f:
        data = f.read()
    
    sections = data.split("\n\n")
    data = {}
    data["seeds"] = sections[0].split(": ")[1]
    data["seed-to-soil map"] = sections[1].split(":\n")[1]
    data["soil-to-fertilizer map"] = sections[2].split(":\n")[1]
    data["fertilizer-to-water map"] = sections[3].split(":\n")[1]
    data["water-to-light map"] = sections[4].split(":\n")[1]
    data["light-to-temperature map"] = sections[5].split(":\n")[1]
    data["temperature-to-humidity map"] = sections[6].split(":\n")[1]
    data["humidity-to-location map"] = sections[7].split(":\n")[1]
    
    
    data_test = {
"seeds": "79 14 55 13",
"seed-to-soil map": """50 98 2
52 50 48""",
"soil-to-fertilizer map": """0 15 37
37 52 2
39 0 15""",
"fertilizer-to-water map": """49 53 8
0 11 42
42 0 7
57 7 4""",
"water-to-light map": """88 18 7
18 25 70""",
"light-to-temperature map": """45 77 23
81 45 19
68 64 13""",
"temperature-to-humidity map": """0 69 1
1 0 69""",
"humidity-to-location map": """60 56 37
56 93 4"""
    }
    
    import time
    start = time.time()
    result = main(data)
    end = time.time()
    print(result)
    print(f"Time: {end-start}s")


