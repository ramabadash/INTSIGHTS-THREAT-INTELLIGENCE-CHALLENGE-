from models.models import Paste
from mongoengine import connect

# Load .env file using:
from dotenv import load_dotenv
load_dotenv()
import os
MONGO_URI = os.getenv("MONGO_URI")
connect("dark_web_scrape", host=MONGO_URI) # Connect to db


def get_number_of_pastes():
    """
    :return: total number of pastes in db
    """
    return Paste.objects.count()

def get_authors_analysis():
    """
    :return: list with authors as keys and number of posts as value
    """
    return list(Paste.objects().aggregate(
        {"$group": { "_id": "$Author",
               "Total": { "$sum": 1 } } }
    ))

def get_dates_analysis():
    """
    :return: list with authors as keys and number of posts as value
    """
    return list(Paste.objects().aggregate(
        {"$group": { "_id" : {"$dateToString": { "format": "%Y %m %d, %H:%M:%S", "date": "$split : [$Date , ',']"}},
               "Total": { "$sum": 1 } } }
    ))

def get_common_words():
    """
    :return: list with authors as keys and number of posts as value
    """
    analytics_obj = {
        "total_pastes_bitcoin": Paste.objects(Title__icontains='bitcoin').count(),
        "total_pastes_porn": Paste.objects(Title__icontains='porn').count(),
        "total_pastes_gun": Paste.objects(Title__icontains='gun').count(),
        "total_pastes_creditcard": Paste.objects(Title__icontains='creditcard').count(),
        "total_pastes_onion": Paste.objects(Title__icontains='onion').count(),
        "total_pastes_drug": Paste.objects(Title__icontains='drug').count(),
        "total_pastes_hack": Paste.objects(Title__icontains='hack').count(),
        "total_pastes_leak": Paste.objects(Title__icontains='leak').count(),
        "total_pastes_child": Paste.objects(Title__icontains='child').count(),
        "total_pastes_dark": Paste.objects(Title__icontains='dark').count(),
    }
    return analytics_obj


print(get_authors_analysis())
print(get_common_words())


