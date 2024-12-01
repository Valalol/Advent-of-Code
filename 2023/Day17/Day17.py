
def main(data, phase=1):
    pass

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

    
    result = main(data, 1)
    print(result)


