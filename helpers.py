import json
from fastapi import Request # Server
import asyncio
# Scarper
from scraper.webScraper import scrape 
# DB
from database.db import DB
# Analysis
from analysis import Analyzer

async def event_generator(request):
        '''
        :request: client request
        preform scrape and send data to client
        '''
        while True:
            # Disconnect
            if await request.is_disconnected():
                print('Request disconnected')
                break

            # Scraper
            print("Scraping now")
            all_pastes = scrape() 
            if len(all_pastes) > 0:
                data = {
                    "common_words_title": Analyzer.get_common_words_title(),
                    "common_words_content":Analyzer.get_common_words_content(),
                    "number_of_pastes": Analyzer.get_number_of_pastes(),
                    "authors_analysis": Analyzer.get_authors_analysis(),
                    "pastes": all_pastes
                    }
                print(json.dumps(data))
                yield {
                    "event": "update",
                    "data": f"{json.dumps(data)} \n\n"
                }
                # Save to DB
                for paste in all_pastes:
                    try:
                        DB.insert_One(paste)
                    except:
                        "Error getting pastes"
                print("Inserted")
            else:
                print('No change in pastes...')
            # Sleep
            await asyncio.sleep(120)
