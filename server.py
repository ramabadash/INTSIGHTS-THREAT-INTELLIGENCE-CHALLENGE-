from fastapi import FastAPI
from models import Paste
from mongoengine import connect

# Load .env file using:
from dotenv import load_dotenv
load_dotenv()

# Use the variable with:
import os
MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI() # Create server
connect("dark_web_scrape", host=MONGO_URI) # Connect to db

# Just to check
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Get all pastes
@app.get("/get_all")
def get_all_data():
    data = Paste.objects.all()
    return data
