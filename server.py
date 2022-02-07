from fastapi import FastAPI


app = FastAPI() # Create server
@app.get("/")
def read_root():
    return {"Hello": "World"}

