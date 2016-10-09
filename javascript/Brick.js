class Brick {
  constructor(image, x, y, width, height, board_width, board_height) {
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  checkCollisionWithBall(ball) {
    if ( !(this.x > object.x + ball.width || this.x + this.width < ball.x) ) {
      if ( this.y + this.height > ball.y || this.y > ball.y + ball.height ) {
        return true;
      }
    }
    return false;
  }
}
