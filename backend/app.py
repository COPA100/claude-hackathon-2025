from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from typing import Annotated, Optional, List, Literal
import json
from pydantic import BaseModel

from dotenv import dotenv_values
env = dotenv_values(".env")

from uuid import UUID

app = FastAPI(title="Claude Hackathon API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ngrok endpoint
    allow_methods=["*"],  # Allow all HTTP methods: POST, GET, etc.
    allow_headers=["*"],  # Allow all headers
    allow_credentials=False
)

db_url = env.get("DATABASE_URL")
# import sqlite3
# import mysql.connector
import psycopg2
from psycopg2.extras import RealDictCursor
@app.get("/get_listings")
def getListings():
  '''Returns all of the professors listings'''
  connection = psycopg2.connect(db_url)
  try:
    with connection.cursor(cursor_factory=RealDictCursor) as cursor:
      cursor.execute("SELECT * FROM research_postings;")
      rows = cursor.fetchall()
      # print(rows)
      return {"listings": rows}
  finally:
    connection.close()


  
  



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
  # id: UUID
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
# import filter
import database
import sifting_ai

@app.get("/top_candidates/{listing_id}")
def topXCandidates(listing_id: str):
  '''Returns the top X candidates for the position'''

  conn = psycopg2.connect(db_url)
  try:
      with conn.cursor(cursor_factory=RealDictCursor) as cursor:
          cursor.execute(
              "SELECT * FROM research_postings WHERE id = %s;",
              (str(listing_id),)  # tuple required
          )
          listing = cursor.fetchone()

          # if not row:
          #     raise HTTPException(status_code=404, detail="Listing not found")
  finally:
      conn.close()

  research_area = listing["research_areas"][0]
  description = listing["description"]
  filtered_candidates = database.filter_by_interest(research_area)

  rankings = sifting_ai.Compatability(description, filtered_candidates)
  sorted_items = sorted(rankings.items(), key=lambda x: x[1], reverse=True)
  top_five = dict(sorted_items[:5])
  return top_five
  


if __name__ == "__main__":
  host = "0.0.0.0"
  uvicorn.run(app="app:app",
                host=host,
                port = 8802,
                reload=True)