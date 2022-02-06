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
    print("In the function")
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

