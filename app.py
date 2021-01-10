import socketio, os
from gen import GameCode
from flask import Flask , jsonify, redirect, url_for, send_from_directory, abort, request
from flask_socketio import SocketIO, join_room
import redis 
from dotenv import load_dotenv

load_dotenv(verbose=True)

app =  Flask(__name__, static_folder='public')
app.config["SECRET_KEY"] = "$6Cti2TGf1f4k"
socketio = SocketIO(app, cors_allowed_origins=os.getenv("CORS_HEADERS")) # Remove that arg when done developing!
redis_host = os.getenv('REDIS_HOST')
redis_pass = os.getenv('REDIS_PASS')
redis_port = os.getenv('REDIS_PORT')
r = redis.Redis(host=redis_host,port=redis_port,password=redis_pass)

is_connected = r.ping()
if is_connected == True:
    print("connected to redis..")
else:
    print("could not reach redis..")

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
    try:
        post_data = request.get_data()
    except:
        return jsonify({"ok": False, "error": "Failed to get questions from posted body. Please ensure that the body is a JSON array of strings."})
    gamecode = GameCode.generate()
    # r.hmset(gamecode)
    # print(r.hmget(gamecode))
    response = {"gamecode":gamecode}
    qs = post_data.split(",")
    r.hset(gamecode, mapping={'currentQ': 0, 'teams': [], 'questions': qs})
    return jsonify(response)

@socketio.on('join-session')
def handle_join(username,teamnumber,gamecode):
    join_room(gamecode)
    socketio.emit('participant-joined',room=gamecode)


@socketio.on('answer')
def handle_answer(answer, team_no, q_no, game_id, username):
    socketio.emit('answer-submitted', answer, team_no, q_no, game_id, username, room=gamecode)

@socketio.on('question')
def change_question(game_id, new_question_no, question_text):
    socketio.emit('question', new_question_no, question_text, room=game_id)

   
if __name__ == "__main__":
   socketio.run(app, host="0.0.0.0")