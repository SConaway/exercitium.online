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

@app.route("/game/start")
def start():
    game_code = GameCode.generate()
    # r.hmset(gamecode)
    # print(r.hmget(gamecode))
    response = {"gamecode":game_code}
    # qs = post_data.split(",")
    r.hset(gamecode, mapping={'currentQ': 0, 'teams': {}})
    return jsonify(response)

@socketio.on('join-session')
def handle_join(username,team_number,game_code):
    join_room(gamecode)
    socketio.emit('participant-joined', username, team_number, room=game_code)
    replace = r.get(game_code)
    replace["teams"][team_number] = 0
    r.set(game_code, mapping=replace)


@socketio.on('answer')
def handle_answer(answer, team_no, q_no, game_id, username, game_code):
    socketio.emit('answer-submitted', answer, team_no, q_no, game_id, username, room=game_code)

@socketio.on('question')
def change_question(game_id, new_question_no, question_text):
    socketio.emit('new-question', new_question_no, question_text, room=game_id)
    replace = r.get(game_id)
    r['currentQ'] = new_question_no
    r.set(game_id, mapping=replace)

if __name__ == "__main__":
   socketio.run(app, host="0.0.0.0")
