from fastapi import FastAPI, File, UploadFile
import uvicorn

from typing import Annotated, Optional, List, Literal
import json
from pydantic import BaseModel

from uuid import UUID

app = FastAPI(title="Claude Hackathon API")

app.get("/top_posts")
def getTopPosts():
    return



# Extracts the relevant features from the resume
import resume_ai

app.get("/embed_resume")
def embedResume(file: Annotated[bytes, File()]):
  embed = resume_ai.extract_text_from_pdf()
  try:
     json_object = json.loads(embed)

  except Exception as e:
     print("The AI halucinated")
    #  Return some signal to the user that the resume went through
  return 

class listing(BaseModel):
  id: UUID
  description: str
  pay_type: Literal["paid", "credit", "volunteer"]
  compensation_amount: Optional[float] = None   # for paid roles
  credit_amount: Optional[float] = None         # for credit roles
  requirements: List[str]
  minimum_time_commitment: str                  # e.g. "10 hrs/week"
  duration: str 

app.get("/create_listing", )
def createListing(listing: listing):
   return
   


if __name__ == "__main__":
   uvicorn.run(app, port="8802")