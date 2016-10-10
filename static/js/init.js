PLAYER_WIDTH = 100;
PLAYER_HEIGHT = 100;
PLAYER_SPEED = 7;

player = new Player(
  "static/images/player.png",
  c.width / 2 - PLAYER_WIDTH / 2,
  c.height - PLAYER_HEIGHT * 1.5,
  PLAYER_WIDTH, PLAYER_HEIGHT,
  PLAYER_SPEED,
  c.width,
  c.height
);
