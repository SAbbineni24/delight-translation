from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World"}

# /items/?q=somevalue.
@app.get("/marian-kde4/{english_text}")
def do_marian_kde4(english_text):
    print(english_text)
    translator = pipeline("translation_en_to_fr", model="emath/marian-finetuned-kde4-en-to-fr")
    res = translator(english_text)
    return {"message" : res[0]['translation_text']}

@app.get("/marian-iswlt2017/{english_text}")
def do_marian_iswlt2017(english_text):
    translator = pipeline("translation_en_to_fr", model="emath/marian-finetuned-iswlt2017-en-to-fr")
    res = translator(english_text)
    return {"message" : res[0]['translation_text']}

@app.get("/delight/{english_text}")
def delight(english_text):
    pipe = pipeline("text2text-generation", model="shabbineni/NLP_477")
    res = pipe(english_text)
    return {"message" : res[0]['generated_text']}


@app.get("/t5-kde4")
def do():
    return

@app.get("/t5-iswlt2017")
def do():
    return

origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

if __name__ == "__main__":
    
    # wmt 2014
    # from transformers import AutoModel, AutoTokenizer
    # import torch

    # Load tokenizer and model
    # tokenizer = AutoTokenizer.from_pretrained("shabbineni/NLP_477")
    # model = AutoModel.from_pretrained("shabbineni/NLP_477")

    # # Encode some input (manually handle prefixes if needed)
    # inputs = tokenizer("Hello, how are you?", return_tensors="pt")

    # # Generate an output
    # with torch.no_grad():  # Don't forget to import torch
    #     outputs = model(**inputs)

    # decoded_text = tokenizer.decode(outputs)
    # print(decoded_text)
    english_text = "My name is Ethan"

    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", access_log=False)
