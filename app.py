import socketio, os
from gen import GameCode
from flask import Flask , jsonify, redirect, url_for, send_from_directory, abort
from flask_socketio import SocketIO

from dotenv import load_dotenv
load_dotenv(verbose=True)

app =  Flask(__name__, static_folder='public')
app.config["SECRET_KEY"] = "$6Cti2TGf1f4k"
socketio = SocketIO(app, cors_allowed_origins=os.getenv("CORS_HEADERS")) # Remove that arg when done developing!

@app.route('/dist/<path:path>')
def dist(path):
    serve_dir = app.static_folder + '/dist/'
    if path != "" and os.path.exists(serve_dir + path):
        send = send_from_directory(serve_dir, path)
        send.mimetype = 'text/javascript'
        send.headers['content-type'] = 'text/javascript'
    else:
        abort(404)
    return send

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/game/start",methods=['POST'])
def start():
    gamecode = GameCode.generate()
    response = {"gamecode":gamecode}
    return jsonify(response)

@socketio.on('join')
def join(gamedetails):
    print('received json: ' + str(gamedetails))

if __name__ == "__main__":
   socketio.run(app)
