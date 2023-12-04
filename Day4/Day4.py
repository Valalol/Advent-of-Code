def main1(data):
    out = []
    result = 0
    for line in data.split("\n"):
        usefull_line = line.replace("   ", " ").replace("  ", " ").split(": ")[1]
        winner_cards = usefull_line.split(" | ")[0].split(" ")
        cards = usefull_line.split(" | ")[1].split(" ")
        winning_cards = [int(card) for card in cards if card in winner_cards]
        if len(winning_cards) > 0:
            result += 2**(len(winning_cards)-1)
        out.append(winning_cards)
    return result

def main2(data):
    out = []
    result = 0
    card_amount_list = [1 for i in range(len(data.split("\n")))]
    for line in data.split("\n"):
        line_splitted = line.replace("   ", " ").replace("  ", " ").split(": ")
        card_number = int(line_splitted[0].split(" ")[1])-1
        usefull_line = line_splitted[1]
        winner_cards = usefull_line.split(" | ")[0].split(" ")
        cards = usefull_line.split(" | ")[1].split(" ")
        winning_cards = [int(card) for card in cards if card in winner_cards]
        
        for i in range(len(winning_cards)):
            card_amount_list[card_number+i+1] += card_amount_list[card_number]
    
    return sum(card_amount_list)


if __name__ == "__main__":
    with open("Day4_data.txt", "r") as file:
        data = file.read()
    
    data_test = """Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"""
    
    result = main2(data)
    print(result)


