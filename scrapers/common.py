from bs4 import BeautifulSoup
import requests


# Init
def generate_bs_obj(url) -> BeautifulSoup:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    return soup


# Gets the title property of nth "a" tag
def get_link_title(obj, idx=0) -> str:
    link_objects = obj.findAll("a")
    if not link_objects:
        return ""
    elif idx >= len(link_objects):
        return ""
    else:
        return link_objects[idx]["title"]


# Works particularly for fandom. Fetches the attached image (first occurrence)
def fandom_get_log_meta(obj) -> (str, str):
    char_image = obj.find("img")
    if char_image:
        return char_image["data-src"], char_image["data-image-key"]
