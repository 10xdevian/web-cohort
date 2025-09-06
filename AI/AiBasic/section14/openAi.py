from openai import OpenAI

client = OpenAI(
    api_key="AIzaSyBJFlFbSQtfczrxtCNEnlzniIrL2wJloZ0",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    reasoning_effort="low",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "hy how are you"
        }
    ]
)

print(response.choices[0].message.content)