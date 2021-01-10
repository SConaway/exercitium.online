import socketio
from gen import GameCode
from flask import Flask , jsonify
from flask_socketio import SocketIO , join_room

app =  Flask(__name__)
app.config["SECRET_KEY"] = "$6Cti2TGf1f4k"
socketio = SocketIO(app)




@app.route("/")
def index():
    return "start"


@app.route("/game/start")
def start():
    gamecode = GameCode.generate()
    response = {"gamecode":gamecode}
    return jsonify(response)



# @socketio.on('join-session')
# def handle_join(gamecode):
#     join_room()

if __name__ == "__main__":
   socketio.run(app)