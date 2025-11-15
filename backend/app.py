from fastapi import FastAPI
import uvicorn

app = FastAPI(title="Claude Hackathon API")

app.get("/top_posts")
def getTopPosts():
    return


# Extracts the relevant features from the resume
app.get("/embed_resume")
def embedResume():
  return 