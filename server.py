# ---------- PACKAGES ---------- #
# General
from fastapi import FastAPI # Server
#Services
from scraper.webScraper import scrape 
# DB
from database.db import DB

# ---------- SETUP SERVER ---------- #
app = FastAPI() 
DB.connection()

# ---------- CORS ---------- #

from fastapi.middleware.cors import CORSMiddleware

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initial DB on server start
def save_all_pastes_to_db():
    print("Scraping now")
    all_pastes = scrape() #TODO - Not to scrape over everything

    for paste in all_pastes:
        try:
            DB.insert_One(paste)
        except:
            "Error getting pastes"
    print("Inserted")
    return


# ---------- ROUTERS ---------- #
# Just to check
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Get all pastes
@app.get("/get_all/{skip}")
def get_all_data(skip):
    data = DB.find_all(int(skip))
    save_all_pastes_to_db() #scrape again
    return data

