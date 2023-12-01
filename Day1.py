def main(data):
    text_digits = {"one": 1, "two": 2, "three": 3, "four": 4,"five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
    values = []
    
    for line in data.split("\n"):
        numbers = []
        i = 0
        while i < len(line):
            char = line[i]
            
            if char.isdigit():
                numbers.append(int(char))
            
            else:
                for text_digit in text_digits:
                    
                    if len(line) < i + len(text_digit):
                        continue
                    
                    k = len(text_digit)
                    if line[i:i+k] == text_digit:
                        digit = text_digits[text_digit]
                        numbers.append(digit)
                        # i += k - 1 # Prevent overlapping digits <--- This was wrong
                        break
            i += 1
        
        values.append(int(f"{numbers[0]}{numbers[-1]}"))
    return(sum(values))


if __name__ == "__main__":
    with open("Day1_data.txt", "r") as file:
        data = file.read()
    
    data_test = "1234567890onetwothreefourfivesixseveneightninezero"
    
    print(main(data))