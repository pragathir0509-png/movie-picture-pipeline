from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MOVIES = [
    {"id": 1, "title": "The Shawshank Redemption", "year": 1994, "genre": "Drama"},
    {"id": 2, "title": "The Dark Knight", "year": 2008, "genre": "Action"},
    {"id": 3, "title": "Spirited Away", "year": 2001, "genre": "Animation"},
    {"id": 4, "title": "Interstellar", "year": 2014, "genre": "Science Fiction"},
    {"id": 5, "title": "The Grand Budapest Hotel", "year": 2014, "genre": "Comedy"},
]


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/movies")
def movies():
    return jsonify(MOVIES)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
