import json
import fandom_util
import common

# Init
URL = "https://genshin-impact.fandom.com/wiki/Characters"
soup = common.generate_bs_obj(URL)
generated_data = []

# Scrape the appropriate table
table = soup.find("table", {"class": "article-table"})
row_entries = table.findAll('tr')[1:]

for row in row_entries:
    char_data = {}
    cols = row.findAll('td')
    char_image = cols[0].find("img")
    if char_image:
        char_data["img_src"] = char_image["data-src"]
        char_data["img_alt"] = char_image["data-image-key"]

    char_data["name"] = common.get_link_title(cols[1])
    rarity_img = cols[2].find("img")["alt"]
    char_data["rarity"] = fandom_util.convert_rarity(rarity_img)
    element_raw = cols[3].find("a")
    if element_raw:
        char_data["element"] = element_raw["title"]
    else:
        char_data["element"] = "Anemo"
    char_data["weapon"] = common.get_link_title(cols[4])
    # char_data["gender"] = cols[5].text
    char_data["nation"] = common.get_link_title(cols[6])

    # Append data entry to root
    generated_data.append(char_data)

with open("characters.json", "w") as out_file:
    json.dump(generated_data, out_file)
# print(generated_data)

#     character_soup = BeautifulSoup(row, 'html.parser')
#     print(character_soup.find("img"))