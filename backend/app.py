from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from typing import Annotated, Optional, List, Literal
import json
from pydantic import BaseModel

from uuid import UUID

app = FastAPI(title="Claude Hackathon API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ngrok endpoint
    allow_methods=["*"],  # Allow all HTTP methods: POST, GET, etc.
    allow_headers=["*"],  # Allow all headers
    allow_credentials=False
)

import sqlite3
import mysql.connector
@app.get("/get_listings")
def getListings():
  '''Returns all of the professors listings'''
  # conn = sqlite3.connect("database.sql")   # or .db
  # conn.row_factory = sqlite3.Row          # enables dict-like rows
  # cur = conn.cursor()

  # cur.execute("SELECT * FROM research_postings;")
  # rows = cur.fetchall()

  # # Convert sqlite Row objects → dicts
  # result = [dict(row) for row in rows]
  conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='claude-for-good',
        database='research_atlas'  
    )
    
  cursor = conn.cursor(dictionary=True)
    
  try:
      cursor.execute("SELECT * FROM research_postings;")

      # return cursor.fetchall()
      rows = cursor.fetchall()
      result = [dict(row) for row in rows]
      
  finally:
      cursor.close()
      conn.close()
      return {"listings": result}



# Extracts the relevant features from the resume
import resume_ai

@app.post("/embed_resume")
def embedResume(file: Annotated[bytes, File()]):
  embed = resume_ai.extract_text_from_pdf()
  try:
     json_object = json.loads(embed)

  except Exception as e:
     print("The AI halucinated")
    #  Return some signal to the user that the resume went through
  return 

class Requirements(BaseModel):
  year: int
  availability: float #hours/week
  gpa: Optional[float] = None
  experience: str
  graduate: bool = False

  # This next one is experimental
  min_experience_score: Optional[float] = None

class Listing(BaseModel):
  id: UUID
  description: str
  pay_type: Literal["paid", "credit", "volunteer"]
  compensation_amount: Optional[float] = None   # for paid roles
  credit_amount: Optional[float] = None         # for credit roles
  requirements: Requirements
  minimum_time_commitment: str                  # e.g. "10 hrs/week"
  duration: str 

@app.post("/create_listing", )
def createListing(listing: Listing):
  #  Add to listing database
   return

# return the top candidates for the position

@app.get("/top_candidates")
def topXCandidates(X: int, listing_id: str):
  '''Returns the top X candidates for the position'''
  # filtered_candidates = 
  return


if __name__ == "__main__":
  host = "0.0.0.0"
  uvicorn.run(app="app:app",
                host=host,
                port = 8802,
                reload=True)