import json
import fandom_util
import common

# Init
outfile = "weapons_swords.json"
URL = "https://genshin-impact.fandom.com/wiki/Swords"
soup = common.generate_bs_obj(URL)
generated_data = []

# Scrape the appropriate table
table = soup.findAll("table")[1]
row_entries = table.findAll('tr')[1:]

for row in row_entries:
    weapon_data = {}
    cols = row.findAll('td')
    weapon_data["name"] = common.get_link_title(cols[0])
    weapon_data["img_src"], weapon_data["img_alt"] = common.fandom_get_log_meta(cols[1])
    # Append data entry to root
    generated_data.append(weapon_data)

with open(outfile, "w") as out_file:
    json.dump(generated_data, out_file)
