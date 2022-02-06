from logging import error
import requests
from bs4 import BeautifulSoup

# ---------- GET LANDING PAGE FOR WEBSITE WITH URL ---------- #
def get_landing_page(url, socks_proxy, http_proxy):
    """
    url: Website url str
    socks_proxy: users socks_proxy str
    http_proxy: users http_proxy str
    return: Landing html page for url
    """
    proxies = {
        "socks5h": socks_proxy,
        "http": http_proxy,
    }
    try:
        response = requests.get(url, proxies=proxies)
        nice_html = BeautifulSoup(response.text, 'html.parser')
        return nice_html
    except: 
        print(f"Error with getting {url} page code")

# ---------- GET PASTE AND RETURN AS OBJ ---------- #
def from_paste_to_object(paste):
    """
    :paste: Div element
    :return: Paste obj with {Title: ? , Author: ?, Date: ?, Content: ?} or None
    """
    try:
        details_line_list = paste.find_all('div', {"class": 'col-sm-6'})[0].text.split(" ")
        return {
        "Title": paste.find_all("h4")[0].text.strip("\n").strip("\t"),
        "Author": details_line_list[2],
        # "Content":,
        "Date": " ".join(details_line_list[4:8]),
        }
    except:
        return

print(main())
