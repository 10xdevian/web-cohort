import tiktoken


enc = tiktoken.encoding_for_model("gpt-4o")

text = "hey there! my name is vikram kumar"

tokens = enc.encode(text)
print("tokens", tokens)

tokens = [48467, 1354, 0, 922, 1308, 382, 81995, 4829, 14289, 277]
decodeToken = enc.decode(tokens)
print("DecodeTokens : ", decodeToken)
