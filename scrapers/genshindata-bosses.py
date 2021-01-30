import sys
import json

# Using readlines()
print(sys.argv)
file1 = open(sys.argv[1], 'r')
Lines = file1.readlines()

id_list = [1001, 1002, 1003, 1004, 1005, 1006]
namelist = ["Pyro Regisvine", "Cryo Regisvine", "Oceanid", "Anemo Hypostasis", "Electro Hypostsis", "Geo Hypostasis"]
sasslist = ["boss_1001", "boss_1002", "boss_1003", "boss_1004", "boss_1005", "boss_1006"]

keys = ["col1", "col2", "art1", "art2", "art3", "art4", "asc1", "asc2", "asc3", "asc4", "asc5"]
OFFSET = len(keys)
ROW_OFFSET = 8
COLUMN_OFFSET = len(keys)
ROW_POINTER = 0
obja = []
objb = []


# Takes a range(0-based inclusive) and returns two JSON objects pertaining to the parsed object
def parseLines(lines, start=0, end=8) -> (list, list):
    obja = []
    objb = []
    for line in lines[start:end]:
        tmpa = {}
        tmpb = {}
        col = line.split()
        for i in range(COLUMN_OFFSET):
            if i < 2:
                tmpa[keys[i]] = int(col[i])
                tmpb[keys[i]] = int(col[i + COLUMN_OFFSET])
            else:
                tmpa[keys[i]] = float(col[i])
                tmpb[keys[i]] = float(col[i + COLUMN_OFFSET])
        obja.append(tmpa)
        objb.append(tmpb)
    return obja, objb


return_obj = [None] * 6

# Strips the newline character
return_obj[0], return_obj[1] = parseLines(Lines, ROW_POINTER, ROW_POINTER + ROW_OFFSET)
ROW_POINTER += 8
return_obj[2], return_obj[3] = parseLines(Lines, ROW_POINTER, ROW_POINTER + ROW_OFFSET)
ROW_POINTER += 8
return_obj[4], return_obj[5] = parseLines(Lines, ROW_POINTER, ROW_POINTER + ROW_OFFSET)

write_value = []

for i in range(6):
    tmp = {}
    tmp["id"] = id_list[i]
    tmp["name"] = namelist[i]
    tmp["icon"] = sasslist[i]
    tmp["data"] = return_obj[i]
    write_value.append(tmp)

with open('data_bosses.json', 'w') as outfile:
    json.dump(write_value, outfile)
