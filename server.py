from fastapi import FastAPI
from models import Paste, NewPate
from mongoengine import connect
from webScraper import scrape

# Load .env file using:
from dotenv import load_dotenv
load_dotenv()

# Use the variable with:
import os
MONGO_URI = os.getenv("MONGO_URI")

# ---------- SETUP SERVER AND DB ---------- #
app = FastAPI() # Create server
connect("dark_web_scrape", host=MONGO_URI) # Connect to db

# Initial DB on server start
def save_all_pastes_to_db(): 
    all_pastes = scrape()
    for paste in all_pastes:
        try:
            Paste(Title=paste["Title"],Author=paste["Author"],
             Content=paste["Content"], Date=paste["Date"]).save()
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
@app.get("/get_all")
def get_all_data():
    data = Paste.objects.all()
    return data
