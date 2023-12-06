def main(data):
    value = 1
    for race in data:
        margin = 0
        for i in range(race[0]):
            if i*(race[0]-i) > race[1]:
                margin += 1
        value *= margin
    return value


if __name__ == "__main__":
    data = ((50, 242), (74, 1017), (86, 1691), (85, 1252))
    data2 = ((50748685, 242101716911252),)
    data_test = ((7, 9), (15, 40), (30, 200))
    
    result = main(data2)
    print(result)


