
def parse(data):
    games = data.split("\n")
    parsed_games = []
    for game in games:
        picks = game.split(": ")[1].split("; ")
        parsed_games.append([[0,0,0] for _ in range(len(picks))])
        for i, pick in enumerate(picks):
            for item in pick.split(", "):
                for c, color in enumerate(["red", "green", "blue"]):
                    if color in item:
                        parsed_games[-1][i][c] = int(item.split(" ")[0])
    return parsed_games


def get_max_color(data):
    new_data = []
    for game in data:
        game_max = [0,0,0]
        for pick in game:
            for i in range(3):
                if pick[i] > game_max[i]:
                    game_max[i] = pick[i]
        new_data.append(game_max)
    return new_data


def main1(data):
    parsed_data = parse(data)
    print(parsed_data)
    max_of_games = get_max_color(parsed_data)
    print(max_of_games)
    
    max_expected = [12,13,14]
    result = 0
    
    for i, game in enumerate(max_of_games):
        if game[0] <= max_expected[0] and game[1] <= max_expected[1] and game[2] <= max_expected[2]:
            result += i+1
        else:
            print(f"Game {i+1} is not valid")
    
    return result

def main2(data):
    parsed_data = parse(data)
    print(parsed_data)
    max_of_games = get_max_color(parsed_data)
    print(max_of_games)
    
    result = 0
    for game in max_of_games:
        result += game[0] * game[1] * game[2]
    
    return result


if __name__ == "__main__":
    with open("Day2_data.txt", "r") as file:
        data = file.read()
    
    data_test = """Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"""
    
    
    
    result = main2(data)
    print(result)


