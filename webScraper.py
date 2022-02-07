from logging import error
import requests
from bs4 import BeautifulSoup

proxies = {
    "socks5h": "socks5h://127.0.0.1:9050",
    "http": "http://127.0.0.1:8118",
}

# ---------- GET LANDING PAGE FOR WEBSITE WITH URL ---------- #
def get_landing_page(url):
    """
    url: Website url str
    return: Landing html page for url
    """
    try:
        response = requests.get(url, proxies=proxies)
        page_clean_html = BeautifulSoup(response.text, 'html.parser')
        return page_clean_html
    except: 
        print(f"Error with getting {url} page code")


# ---------- SET TO PASTES LIST ---------- #
def get_pastes_list_from_html(html_code): 
    """
    :html_code: Web site html code
    :return: pastes into objects list
    """
    pastes = html_code.select("#list > .row") # Get all pastes containers
    pastes_list = []
    # Run throw all pastes containters and get parsed obj from each. Insert into list
    for paste in pastes:
        parsed_obj = from_paste_to_object(paste)
        if parsed_obj:
            # print(f"\n\n parsed_obj: \n\n {parsed_obj}")
            pastes_list.append(parsed_obj)
    print(f"pastes_list :{pastes_list }\n")
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
        # Fixed obj {Title: ? , Author: ?, Date: ?, Content: ?}
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
    # Request full paste html code
    response = requests.get(full_paste_url, proxies=proxies)
    full_paste_html = BeautifulSoup(response.text, 'html.parser')
    # Get content list
    all_content = full_paste_html.find_all("li")
    content = ""
    for li in all_content:
        content += f"{li.text}. " # Add to one string
    return content.strip("\n")

# ---------- GET NUMBER OF PAGES ---------- #
def get_number_of_pages(html_code):
    """
    :html_code: Web page code
    :return: last page number
    """
    pagination_elem = html_code.select(".pagination>li") # Get pagination elem
    return pagination_elem[len(pagination_elem) - 2].text

# ---------- MAIN ---------- #

def scrape():
    """
    :return: List with all pastes from all pages
    """
    html_page = get_landing_page("http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all")
    # Get pages number and empty list
    number_of_pages = int(get_number_of_pages(html_page))
    all_data = []
    page = 1

    # Run throw all pages from 1 to last
    while page < number_of_pages + 1:
        print(f"page: {page}")
        # Get html for page
        html_page = get_landing_page(f"http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all?page={page}")
        # Get pastes objects list and append to general list
        all_data.extend(get_pastes_list_from_html(html_page))
        page += 1
    print(all_data)
    return all_data

# ---------- EXEC ---------- #
   
scrape()
