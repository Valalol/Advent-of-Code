def get_hist(cards):
    hist = {}
    for card in cards:
        if card[0] not in hist:
            hist[card[0]] = 1
        else:
            hist[card[0]] += 1
    return hist


def main1(data):
    # A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2
    cards_values = {"A": 12, "K": 11, "Q": 10, "J": 9, "T": 8, "9": 7, "8": 6, "7": 5, "6": 4, "5": 3, "4": 2, "3": 1, "2": 0}
    
    cards_list = []
    
    for hand in data.split("\n"):
        cards, bid = hand.split(" ")
        first_value = None
        second_value = None
        hist = get_hist(cards)
        
        if 5 in hist.values():
            first_value = 6
        elif 4 in hist.values():
            first_value = 5
        elif 3 in hist.values() and 2 in hist.values():
            first_value = 4
        elif 3 in hist.values():
            first_value = 3
        elif 2 in hist.values() and len(hist) == 3:
            first_value = 2
        elif 2 in hist.values():
            first_value = 1
        else:
            first_value = 0
        
        second_value = tuple([cards_values[card] for card in cards])
        
        cards_list.append(((first_value, second_value), bid, cards))
    
    # print(cards_list)
    cards_list.sort(key=lambda x: x[0])
    print(cards_list)
    
    total_winnings = 0
    for i in range(len(cards_list)):
        total_winnings += int(cards_list[i][1])*(i+1)
    
    return total_winnings



def main2(data):
    # A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J
    cards_values = {"A": 12, "K": 11, "Q": 10, "T": 9, "9": 8, "8": 7, "7": 6, "6": 5, "5": 4, "4": 3, "3": 2, "2": 1, "J": 0}
    
    cards_list = []
    
    for hand in data.split("\n"):
        cards, bid = hand.split(" ")
        first_value = None
        second_value = None
        hist = get_hist(cards)
        
        if 5 in hist.values():
            first_value = 6
        elif 4 in hist.values():
            if "J" in hist.keys():
                first_value = 6
            else:
                first_value = 5
        elif 3 in hist.values():
            if "J" in hist.keys():
                if hist["J"] == 3 and len(hist) == 2:
                    first_value = 6
                elif hist["J"] == 3 and len(hist) == 3:
                    first_value = 5
                elif hist["J"] == 2:
                    first_value = 6
                elif hist["J"] == 1:
                    first_value = 5
            elif 2 in hist.values():
                first_value = 4
            else:
                first_value = 3
        elif 2 in hist.values():
            if "J" in hist.keys():
                if hist["J"] == 2 and len(hist) == 3:
                    first_value = 5
                elif hist["J"] == 2 and len(hist) == 4:
                    first_value = 3
                elif hist["J"] == 1:
                    first_value = 3
            elif len(hist) == 3:
                first_value = 2
            else:
                first_value = 1
        else:
            if "J" in hist.keys():
                first_value = 1
            else:
                first_value = 0
        
        second_value = tuple([cards_values[card] for card in cards])
        
        cards_list.append(((first_value, second_value), bid, cards))
    
    # print(cards_list)
    cards_list.sort(key=lambda x: x[0])
    print(cards_list)
    
    total_winnings = 0
    for i in range(len(cards_list)):
        total_winnings += int(cards_list[i][1])*(i+1)
    
    return total_winnings




if __name__ == "__main__":
    with open("Day7/Day7_data.txt", "r") as file:
        data = file.read()
    
    data_test = """32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483"""
    
    result = main2(data_test)
    print(result)


