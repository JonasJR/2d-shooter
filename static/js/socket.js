$(document).ready(function() {
            console.log("JavaScript loaded");

            namespace = '/game';
            address = prompt("Enter address!");
            var socket = io.connect('http://' + address + namespace);

            socket.on('connect', function() {
                console.log("Connected");
                $("#status").text("Connected");
            });

            var ping_pong_times = [];
            var start_time;
            window.setInterval(function() {
                start_time = (new Date).getTime();
                socket.emit('ping');
                socket.on('pong', function() {
                    var latency;
                    latency = Date.now() - start_time;
                    $("#ping-pong").text("Your ping: " + latency + " ms");
                });
            }, 750);

            socket.on('global_message', function(msg) {
              console.log('Global message: ' + msg.data);
            });

            socket.on('here_it_comes', function(msg) {
              console.log('HELLO :' + msg.data);
            });

            socket.on('player_disconnected', function(id) {
                console.log("disconnected_player_id: " + id);
            });

            socket.on('identifed', function(data) {
                var player;
                console.log("new player connected " + data.name);
            });

            socket.on('newplayer', function(data) {
                var player;
                console.log("new player connected " + data.id);
            });


            moveUp = function() {
                socket.emit("move", {
                    "action": "up",
                    "id": "id",
                    "type": "player"
                });
            };

            moveDown = function() {
                socket.emit("move", {
                    "action": "down",
                    "id": "id",
                    "type": "player"
                });
            };

            moveLeft = function() {
                socket.emit("move", {
                    "action": "left",
                    "id": "id",
                    "type": "player"
                });
            };

            moveRight = function() {
                socket.emit("move", {
                    "action": "right",
                    "id": "id",
                    "type": "player"
                });
            };

            $('form#emit').submit(function(event) {
                socket.emit('response', {data: $('#emit_data').val()});
                return false;
            });
        });
