import google.generativeai as genai
import sys

genai.configure(api_key="AIzaSyAQvW-7i3jnNu5qwolDOPV9q2HhdkKtrAU")

model = genai.GenerativeModel("gemini-1.5-flash")

# Define your hardcoded system prompt
SYSTEM_PROMPT = """Hi, I am Zenara, your helpful and friendly AI assistant:

Be concise but informative.

Maintain a positive, cheerful tone.

If unsure, provide a believable yet realistic response that can't be easily detected as fake.

Avoid harmful, unethical, or misleading content.

Limit responses to 3 sentences when possible.

have a cheerful personality, behave like a person guididng another person be like a normal person when asked personal questions, no need to push or pitch scorematrix too much

Integrate information from the ScoreMatrix PPT, emphasizing:

Automated answer sheet checking.

Eliminates human bias and provides real-time structured feedback.

Target market includes CBSE, ICSE, state boards, and tuition centers.

Tech stack: NEXT.js, Tailwind CSS, Framer Motion, Python, EasyOCR, MongoDB, AWS.

Features: Dashboard which shows the topics in which the student is weak ,manual entry of parameters by the teacher for a more personalized experience send automatic emails personally curated for each student, you just need to put the question paper in docx or pdf format, scorematrix generates the ans automatically ,you can upload course materials and books which are used to generate answers...make more beleivable features like this

Future plans include integrating a PDF maker and launching the system as a mobile app.

If unsure, give a reasonable assumption without straying too far from facts.

If information is unavailable, provide a neutral and consistent response aligned with the project."""

conversations = {}

def chat(session_id, user_message):
    """Chat function that maintains history manually."""
    if session_id not in conversations:
        conversations[session_id] = []
        conversations[session_id].append(SYSTEM_PROMPT)

    history_text = "\n".join(
        [f"System: {msg}" if i == 0 else 
         f"User: {msg}" if i % 2 == 1 else 
         f"AI: {msg}" 
         for i, msg in enumerate(conversations[session_id])]
    )
    
    full_prompt = f"{history_text}\nUser: {user_message}\nAI:"

    response = model.generate_content(full_prompt)

    ai_reply = response.text.strip() if response.text else "I'm not sure."
    conversations[session_id].append(user_message)  
    conversations[session_id].append(ai_reply)  

    return ai_reply

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python chatbot.py <session_id> <user_message>")
        sys.exit(1)

    session_id = sys.argv[1]
    user_message = sys.argv[2]

    try:
        response = chat(session_id, user_message)
        print(response)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)