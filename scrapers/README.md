# Code of Conduct

All the scrapers here access publicly available data on the internet.

To be fair to the awesome sites who provide us this data, and to the community surrounding this project, please do not
misuse the scripts 💛

# About

Since the patches keep adding new weapons and such, these scripts help us verify our available data with other sources
on the internet.

### How to parse the drop-rate data from the Data Gathering team

Copy both the rows like this (Can't select individual grids in google sheets for some reason)

Open a .txt file and paste the content. Every alternate line would have a single number (like shown)

Delete those and keep the other lines. We are done here

- The amount of spaces/tabs does not matter
- the gaps at start don't matter. No need to prettify further

```shell
# Now run (Nothing outisde of standard python install needed)
genshindata_bossparse.py {filename}.py
```
