from fastapi import FastAPI, File, UploadFile
import uvicorn

from typing import Annotated, Optional, List, Literal
import json
from pydantic import BaseModel

from uuid import UUID

app = FastAPI(title="Claude Hackathon API")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # ngrok endpoint
#     allow_methods=["*"],  # Allow all HTTP methods: POST, GET, etc.
#     allow_headers=["*"],  # Allow all headers
#     allow_credentials=False
# )

@app.get("/top_posts")
def getTopPosts():
    return



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
@app.get("top_candidates")
def topXCandidates(X: int, listing_id: str):
  '''Returns the top X candidates for the position'''
  return


if __name__ == "__main__":
  host = "0.0.0.0"
  uvicorn.run(app="app:app",
                host=host,
                port = 8802,
                reload=True)