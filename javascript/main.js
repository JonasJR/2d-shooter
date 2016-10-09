var c = document.getElementById("game-board");
var ctx = c.getContext("2d");

PLAYER_WIDTH = 100;
PLAYER_HEIGHT = 100;
PLAYER_SPEED = 7;

var game_interval;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var keypress = false;

player = new Player(
  "images/player.png",
  c.width / 2 - PLAYER_WIDTH / 2,
  c.height - PLAYER_HEIGHT * 1.5,
  PLAYER_WIDTH, PLAYER_HEIGHT,
  PLAYER_SPEED,
  c.width,
  c.height
);

points = 0;

is_message = true;
message = "Level 1";
message_count = 0;
MESSAGE_TIME = 100;

var right_pressed = false;
var left_pressed = false;
var up_pressed = false;
var down_pressed = false;
var rotateLeftPressed = false;
var rotateRightPressed = false;
var keyUpPressed = false;
var shots = [];

var background = new Image();
background.src = "images/background-sandgrass.jpg";

/* Game Loop */
function gameLoop() {
    if (right_pressed) {
        player.moveRight(c.width);
    }
    if (left_pressed) {
        player.moveLeft();
    }
    if (up_pressed) {
        player.moveUp();
    }
    if (down_pressed) {
        player.moveDown();
    }
    if (rotateLeftPressed) {
      player.rotateLeft();
    }
    if (rotateRightPressed) {
      player.rotateRight();
    }

    /* Paint Screen */
    ctx.clearRect(0, 0, c.width, c.height);

    // Background
    ctx.beginPath();
    ctx.drawImage(background, 0, 0, c.width, c.height);
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);


    if (is_message) {
        ctx.beginPath();
        ctx.font = "36px Verdana";
        ctx.fillText(message, c.width / 2 - 70, c.height / 2 + 50, 500);
        ctx.closePath();

        message_count += 1;
        if (message_count > MESSAGE_TIME) {
            is_message = false;
            message_count = 0;
        }
    }

    // Player
    ctx.beginPath();
    var xView = player.x + player.width / 2;
    var yView = player.y + player.height / 2;
    ctx.translate(xView, yView);
    ctx.rotate((90 + player.angle) * Math.PI / 180)
    ctx.translate(-xView, -yView);
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();

    console.log(shots.length);
    if (shots.length > 0) {
      console.log("i loop");
      shots.forEach(function(shot, index) {
        console.log(shot.getPosition());
        shot.moveUp();
        ctx.beginPath();
        xView = shot.x + shot.width / 2;
        yView = shot.y + shot.height / 2;
        ctx.translate(xView, yView);
        ctx.rotate(shot.angle * Math.PI/180)
        ctx.translate(-xView, -yView);
        ctx.fillRect(shot.x, shot.y, shot.width, shot.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.closePath();

        if (shot.x <= 0) shots.splice(index, 1);
        if (shot.x + shot.width >= shot.board_width) shots.splice(index, 1);
        if (shot.y <= 0) shots.splice(index, 1);
        if (shot.y + shot.height >= c.height) shots.splice(index, 1);
      });
    }

    check_collision();

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

function keyDownHandler(e) {
    if (e.key == "d") {
        right_pressed = true;
    } else if (e.key == "a") {
        left_pressed = true;
    } else if (e.key == "w") {
        up_pressed = true;
    } else if (e.key == "s") {
        down_pressed = true;
    } else if (e.keyCode == 39) {
        rotateRightPressed = true;
    } else if (e.keyCode == 37) {
        rotateLeftPressed = true;
    } else if (e.keyCode == 38) {
      shots.push(new Shot(player.x + player.width / 2, player.y + player.height / 2, 5, 5, 20, player.angle, c.width, c.height));
    }
}

function keyUpHandler(e) {
    if (e.key == "d") {
        right_pressed = false;
    } else if (e.key == "a") {
        left_pressed = false;
    } else if (e.key == "w") {
        up_pressed = false;
    } else if (e.key == "s") {
        down_pressed = false;
    } else if (e.keyCode == 39) {
        rotateRightPressed = false;
    } else if (e.keyCode == 37) {
        rotateLeftPressed = false;
    }
}

function check_collision() {}

function setMessage(new_message) {
    is_message = true;
    message = new_message;
}
