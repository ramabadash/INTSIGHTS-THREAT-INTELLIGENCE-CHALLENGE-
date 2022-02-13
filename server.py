# ---------- PACKAGES ---------- #
# General
from fastapi import FastAPI, Request # Server
#Services
from scraper.webScraper import scrape 
# DB
from database.db import DB
# Analysis
from analysis import Analyzer
# SSE
from sse_starlette.sse import EventSourceResponse
from helpers import event_generator


# ---------- SETUP SERVER ---------- #
app = FastAPI() #uvicorn server:app --reload
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


# ---------- ROUTERS ---------- #
# Just to check
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Stream pastes
@app.get("/stream")
async def stream_pastes(request: Request):
    return EventSourceResponse(
        event_generator(request),
        media_type='text/event-stream',
        status_code=200
    )

# Get all pastes
@app.get("/get_all/{skip}")
async def get_all_data(skip):
    data = DB.find_all(int(skip))
    return data

##### Analytics
###common words
# Title
@app.get("/analysis/common_words_title")
async def get_dark_common_words():
    return Analyzer.get_common_words_title()

# Content
@app.get("/analysis/common_words_content")
async def get_dark_common_words():
    return Analyzer.get_common_words_content()

#Total pastes
@app.get("/analysis/total_amount")
async def get_total_pastes_amount():
    return Analyzer.get_number_of_pastes()

#Pastes per author
@app.get("/analysis/per_author")
async def getget_authors_analysis():
    return Analyzer.get_authors_analysis()

