import re


def convert_rarity(txt) -> str:
    matches = re.findall("[0-9]", txt)
    print(matches)
    return matches[0]
