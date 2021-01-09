from gen import GameCode
from flask import Flask , jsonify

app =  Flask(__name__)


@app.route("/")
def index():
    return "start"


@app.route("/game/start")
def start():
    gamecode = GameCode.generate()
    response = {"gamecode":gamecode}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)