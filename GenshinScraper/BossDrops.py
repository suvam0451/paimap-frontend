# This script scrapes the elite boss drop data from spreadsheet
# provided by "Gathering | genshin Impact" Discord server
import json

file1 = open('/home/suvam/Documents/DataSource.txt', 'r')
Lines = file1.readlines()
output = []
tags = ["col1", "col2", "art1", "art2", "art3", "art4", "asc1", "asc2", "asc3", "asc4", "asc5"] * 2

file_1 = "./1.json"
file_2 = "./2.json"


def write_json(data, filepath):
    with open(filepath, 'w') as outfile:
        json.dump(data, outfile)


# Left half data
output = []
for line in Lines:
    res = [x for x in line.split()]
    tmp = {}
    for i, ele in enumerate(res[:11]):
        tmp[tags[i]] = ele
    output.insert(len(output), tmp)
write_json(output, file_1)

# Right half data
output = []
for line in Lines:
    res = [x for x in line.split()]
    tmp = {}
    for i, ele in enumerate(res[11:]):
        tmp[tags[i]] = ele
    output.insert(len(output), tmp)
write_json(output, file_2)



