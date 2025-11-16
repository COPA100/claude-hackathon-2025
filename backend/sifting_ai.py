
import anthropic
from dotenv import dotenv_values

api_key = dotenv_values(".env").get("ANTHROPIC_API_KEY")

# Create the Anthropic client
client = anthropic.Anthropic(api_key=api_key)

def getScore(description, candidate_experience):
    prompt = f"""
    Given a user, rate them 0-10 (float) of how compatable they are for the given research opportunity.
    Do not include any other commentary. Just return the float
    {description}S

    Here is the user's experience: 
    {candidate_experience}
    """

    resp = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )

    return resp.content[0].text


def Compatability(description:str, candidates):

    all_scores:dict = {}
    for candidate in candidates:
        score = float(getScore(description,candidate["student_experiences"]))
        all_scores[candidate] = score

    return all_scores

