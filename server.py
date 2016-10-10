#!/usr/bin/env python
import time
import random
from threading import Thread
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from uuid import uuid4

async_mode = None

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None

# Names given randomly to users that connects.
names = ["Jonas", "Jerry", "Morre", "Anton", "Trulle", "Herman"]

#Array of connected users and where they are. Array of shots and where they are
online_players = []
shots = []


#background_thread that generates a simple global message to every player
def background_thread():
    while True:
        socketio.sleep(100)
        socketio.emit('global_message',{'data': 'Wellcome to the server! Please tell your friends!'} , namespace='/game', broadcast=True)
        print("GLOBAL MESSAGE!!!")

#background_calculation_thread that emits all players and shots to the connected users
def background_calculation_thread():
    while True:
        socketio.emit('game_data', {'players': online_players, 'shots': shots}, namespace='/game', broadcast=True)
        time.sleep(0.02)

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.on('connect', namespace='/game')
def on_connect():
    session['id'] = random.randint(1,99999)

    name = random.choice(names) + "-" + str(random.randint(1, 9999))
    opos = {"xPos": random.randint(1,800), "yPos": random.randint(1,600), "name": name, "type": "player",
            "angle": random.randint(1,359), "id": session['id']}
    emit('your_player', opos, namespace='/game') #emit sends to only the user
    online_players.append(opos)
    players = {'online_players': online_players}
    socketio.emit('online_players', players, namespace='/game') #socketio.emit sends to all users in the namespace

    print("Client connected", session["id"], "given name:", name)
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)
    # print "added:", name

@socketio.on('response', namespace='/game')
def response(message):
    socketio.emit('here_it_comes', {'data': message['data']}, namespace='/game')

@socketio.on('disconnect', namespace='/game')
def on_disconnect():
    print("Disconnected", session["id"])
    #del online_players[session["id"]]
    for player in online_players:
        if player['id'] == session["id"]:
            online_players.remove(player)
    socketio.emit("player_disconnected", session["id"], namespace='/game')
    players = {'online_players': online_players}
    socketio.emit('online_players', players, namespace='/game') #socketio.emit sends to all users in the namespace



@socketio.on('ping', namespace='/game')
def on_ping():
    socketio.emit('pong', None, namespace='/game')


@socketio.on('update', namespace='/game')
def update(data):
    for p in online_players:
        if data['id'] == p['id']:
            p['xPos'] = data['xPos']
            p['yPos'] = data['yPos']
            p['angle'] = data['angle']
            if data['shot'] == True:
                shot = {'xPos': p['xPos'],
                'yPos': p['yPos'],
                'angle':p['angle']}
                shots.append(shot)

    # socketio.emit('new_pos', message, namespace='/game', broadcast=True);

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
