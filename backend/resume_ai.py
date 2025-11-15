import pdfplumber
import os
from dotenv import dotenv_values
# import openai

import anthropic


api_key = dotenv_values(".env").get("ANTHROPIC_API_KEY")

# Create the Anthropic client
client = anthropic.Anthropic(api_key=api_key)


def extract_text_from_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_resume_fields(pdf_path):
    resume = extract_text_from_pdf(pdf_path)

    prompt = f"""
    Extract the following from the resume:

    - Work Experience
    - Projects
    - Technical Skills
    - Relevant Coursework

    Return JSON with keys:
    work_experience, projects, technical_skills, relevant_coursework.

    Resume:
    {resume}
    """

    resp = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}]
    )

    return resp.content[0].text

# print(extract_resume_fields("backend/London Grant Resume Google.pdf"))
