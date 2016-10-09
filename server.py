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

names = ["Jonas", "Jerry", "Morre", "Anton", "Trulle", "Herman"]
online_players = {}

def background_thread():
    while True:
        socketio.sleep(10)
        socketio.emit('global_message',{'data': 'Wellcome to the server! Please tell your friends!'} , namespace='/game', broadcast=True)
        print("GLOBAL MESSAGE!!!")

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.on('connect', namespace='/game')
def on_connect():
    session['id'] = str(uuid4())

    name = random.choice(names) + "-" + str(random.randint(1, 9999))
    opos = {"xPos": random.randint(1,800), "yPos": random.randint(1,600), "name": name, "type": "player",
            "direction": "right", "id": session['id']}
    emit('identifed', opos, namespace='/game') #emit sends to only the user
    socketio.emit('newplayer', opos, namespace='/game') #socketio.emit sends to all users in the namespace

    print("Client connected", session["id"], "given name:", name)
    online_players[session['id']] = opos
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
    online_players.pop(session["id"], None)
    socketio.emit("player_disconnected", session["id"], namespace='/game')


@socketio.on('ping', namespace='/game')
def on_ping():
    socketio.emit('pong', None, namespace='/game')


@socketio.on('move', namespace='/game')
def move(message):
    socketio.emit('new_pos', message, namespace='/game', broadcast=True);

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
