# ---------- PACKAGES ---------- #
import pymongo
from bson import json_util
import json
import dotenv

# ---------- DOTENV ---------- #
dotenv.load_dotenv()

import os
MONGO_URI = os.getenv("MONGO_URI")

# ---------- HELPERS ---------- #
# Json parser
def parse_json(data):
    return json.loads(json_util.dumps(data))

# ---------- DB Class ---------- #
class DB:
    connection_uri = MONGO_URI
    DateBase = None
    Collection = None

    # Connection
    def connection():
        client = pymongo.MongoClient(MONGO_URI)
        DateBase = client.dark_web_scrape
        DB.Collection = DateBase.paste

    # Insert One
    def insert_One(paste):
        return DB.Collection.update_one(paste, {"upset": True})

    # Find one
    def find_one_by_date(date):
        return DB.Collection.find_one({"Date": date})

    # Get number of pastes
    def count_collection():
        return DB.Collection.count_documents({})

    # Get all
    def find_all(skip):  
        return parse_json(DB.Collection.find({}).skip(skip).sort("Date", -1))
