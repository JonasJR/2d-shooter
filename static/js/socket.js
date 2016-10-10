namespace = '/game';
//socket variable that is used to comunicate with the server.
var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

// A function that is called when the client gets connected.
// Here we can do what ever, like tell the user that we are connected...
socket.on('connect', function() {

});

// a ping and latency calculator. Every 0.75 seconds it starts
// a timer and sends a ping to the server and calculates the
// time until the pong gets back.
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

// Ths is a global message reciever. Every 1000s the server sends out a global message
// to all connected players. Right now we just log the message but we can place it in a
// chat window or something fun.
socket.on('global_message', function(msg) {
    console.log('Global message: ' + msg.data);
});

// When some one disconnects this funtion is called.
socket.on('player_disconnected', function(id) {
    console.log("disconnected_player_id: " + id);
});

// The server creates a id and name and sends it to this function.
// We create a tempPlayer to store our pos, id and name for further use in
// the online_players function further down.
var tempPlayer;
socket.on('your_player', function(data) {
    player.setId(data.id);
    // tempPlayer = new Player(
    //   data.xPos,
    //   data.yPos,
    //   PLAYER_WIDTH,
    //   PLAYER_SPEED,
    //   c.width,
    //   c.height
    // );
    // tempPlayer.id = data.id;
    // tempPlayer.name = data.name;
    // console.log("Player ID stored: " + tempPlayer.id);
});

// Recieves all online players and sorts out yourself and stores every one else in the
// otherPlayers array
// This gets called when ever some one connects. Then everyone recieves a list of all online players and pos.
socket.on('online_players', function(data) {
    enemies = [];
    players = data.online_players;
    players.forEach(function(p){
      if(p.id != player.id){
        enemy = new Enemy(p.id, p.xPos, p.yPos, PLAYER_WIDTH,0);
        enemies.push(enemy);
      }
    });
});

socket.on('new_pos', function(data) {
  if(data.id != player.id){

  }
});
