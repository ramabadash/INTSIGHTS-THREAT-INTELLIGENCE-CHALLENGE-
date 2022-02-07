from fastapi import FastAPI
from models.models import Paste, NewPate
from mongoengine import connect
from scraper.webScraper import scrape
import json

# cors
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
]


# Load .env file using:
from dotenv import load_dotenv
load_dotenv()

# Use the variable with:
import os
MONGO_URI = os.getenv("MONGO_URI")

# ---------- SETUP SERVER AND DB ---------- #
app = FastAPI() # Create server
connect("dark_web_scrape", host=MONGO_URI) # Connect to db

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initial DB on server start
def save_all_pastes_to_db():
    data_length = Paste.objects.count()
    print(data_length)
    all_pastes = scrape() #TODO - Not to scrape over everything
    if data_length == 0:
        run_over_items = all_pastes
    else:
        run_over_items = all_pastes[data_length + 1:]

    for paste in run_over_items:
        try:
            Paste(**paste).save()
        except:
            "Error getting pastes"
    return "Inserted"
save_all_pastes_to_db()

# ---------- ROUTERS ---------- #

# Just to check
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Get all pastes
@app.get("/get_all/{skip}")
def get_all_data(skip):
    data = json.loads(Paste.objects.skip(int(skip)).to_json())

    return data
