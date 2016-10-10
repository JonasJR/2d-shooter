namespace = '/game';
var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

console.log("JavaScript loaded");

socket.on('connect', function() {

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

socket.on('player_disconnected', function(id) {
    console.log("disconnected_player_id: " + id);
});

socket.on('identifed', function(data) {
    var tempPlayer = new Player(
      "static/images/player.png",
      data.xPos,
      data.yPos,
      PLAYER_WIDTH, PLAYER_HEIGHT,
      PLAYER_SPEED,
      c.width,
      c.height
    );
    tempPlayer.id = data.id;
    tempPlayer.name = data.name;
    console.log("identified player!");
});

socket.on('online_players', function(data) {

});

socket.on('newplayer', function(data) {
    var player;
    console.log("new player connected " + data.id);
});


// function sendPos(data) {
//     socket.emit("move", {
//         "xPos": "xPos",
//         "yPos": "yPos",
//         "id": "id",
//         "type": "player"
//     });
// }

$('form#emit').submit(function(event) {
    socket.emit('response', {
        data: $('#emit_data').val()
    });
    return false;
});
