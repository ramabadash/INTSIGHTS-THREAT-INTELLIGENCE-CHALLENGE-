from logging import error
import requests
from bs4 import BeautifulSoup

proxies = {
    "socks5h": "socks5h://127.0.0.1:9050",
    "http": "http://127.0.0.1:8118",
}

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


# ---------- SET TO PASTES LIST ---------- #
def get_results_to_list(html_code): 
    """
    :html_code: Web site html code
    :return: pastes into objects list
    """
    pastes = html_code.select("#list > .row")
    pastes_list = []
    for paste in pastes:
        parsed_obj = from_paste_to_object(paste)
        if parsed_obj:
            print(f"\n\n parsed_obj: \n\n {parsed_obj}")
            pastes_list.append(parsed_obj)
    # print(f"pastes_list :{pastes_list }\n")
    return pastes_list
        

# ---------- GET PASTE AND RETURN AS OBJ ---------- #
def from_paste_to_object(paste):
    """
    :paste: Div element
    :return: Paste obj with {Title: ? , Author: ?, Date: ?, Content: ?} or None
    """
    try:
        details_line_list = paste.find_all('div', {"class": 'col-sm-6'})[0].text.split(" ")
        full_paste_url = paste.find_all('a', {"class": 'btn-success'})[0].attrs["href"]
        return {
        "Title": paste.find_all("h4")[0].text.strip("\n").strip("\t"),
        "Author": details_line_list[2],
        "Content": get_paste_content(full_paste_url),
        "Date": " ".join(details_line_list[4:8]),
        }
    except:
        return

# ---------- GET PASTE CONTENT ---------- #
def get_paste_content(full_paste_url):
    """
    :full_paste_url: Dark web url leading to full page
    :return: content str
    """
    response = requests.get(full_paste_url, proxies=proxies)
    full_paste_html = BeautifulSoup(response.text, 'html.parser')
    all_content = full_paste_html.find_all("li")
    content = ""
    for li in all_content:
        content += f"{li.text}. "
    return content.strip("\n")

# ---------- MAIN ---------- #

def main():
    html_page = get_landing_page("http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all", "socks5h://127.0.0.1:9050", "http://127.0.0.1:8118")
    return get_results_to_list(html_page)

main()
