PLAYER_WIDTH = 100;
PLAYER_HEIGHT = 100;
PLAYER_SPEED = 7;

var c = document.getElementById("game-board");
var ctx = c.getContext("2d");

colors = {
  "player": "#2EC4B6",
  "enemy": "#E71D36",
  "board": "#EFFFE9",
  "obsticles": "#011627"
}

var player = new Player(
  c.width / 2 - PLAYER_WIDTH / 2,
  c.height - PLAYER_HEIGHT * 1.5,
  PLAYER_WIDTH, PLAYER_HEIGHT,
  PLAYER_SPEED,
  c.width,
  c.height
);
