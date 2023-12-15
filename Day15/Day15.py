def hash_func(word):
    code = 0
    for char in word:
        code += ord(char)
        code *= 17
        code %= 256
    return code


def main(data, phase=1):
    if phase == 1:
        output = 0
        for word in data.split(","):
            output += hash_func(word)
        return output
    
    else:
        boxes = [{} for _ in range(256)]
        for sequence in data.split(","):
            if "=" in sequence:
                lense_label, value = sequence.split("=")
                lense_hash = hash_func(lense_label)
                
                box = boxes[lense_hash]
                box[lense_label] = int(value)
            
            elif "-" in sequence:
                lense_label = sequence[:-1]
                lense_hash = hash_func(lense_label)
                box = boxes[lense_hash]
                if lense_label in box:
                    del box[lense_label]
            
            else:
                raise Exception ("génant là")
    
    focusing_power = 0
    for i in range(len(boxes)):
        box = boxes[i]
        for j, key in enumerate(box.keys()):
            focal_length = box[key]
            focusing_power += (i+1)*(j+1)*focal_length
    return focusing_power



if __name__ == "__main__":
    with open("Day15/input.txt", "r") as file:
        data = file.read()

    data_test = """rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"""
    
    result = main(data, 2)
    print(result)