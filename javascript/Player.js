class Player {
  constructor(image, x, y, width, height, speed, board_width, board_height) {
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.board_width = board_width;
    this.board_height = board_height;
    this.angle = 0;
  }

  rotateRight() {
    this.angle += 5;
  }

  rotateLeft() {
    this.angle -= 5;
  }

  moveRight() {
    this.x -= this.speed * Math.cos(this.angle * Math.PI / 180);
    this.y -= this.speed * Math.sin(this.angle * Math.PI / 180);
    // this.x += this.speed;
    if (this.x + this.width > this.board_width) this.x = this.board_width - this.width;
  }

  moveLeft() {
    this.setX(this.x -= this.speed * Math.sin(this.angle * Math.PI / 180));
    this.setY(this.y -= this.speed * Math.cos(this.angle * Math.PI / 180));
    // this.x -= this.speed;
    if (this.x < 0) this.x = 0;
  }

  moveDown() {
    this.setX(this.x -= this.speed * Math.cos(this.angle * Math.PI / 180));
    this.setY(this.y -= this.speed * Math.sin(this.angle * Math.PI / 180));
    // this.y += this.speed;
  }

  moveUp() {
    this.setX(this.x += this.speed * Math.cos(this.angle * Math.PI / 180));
    this.setY(this.y += this.speed * Math.sin(this.angle * Math.PI / 180));
  }

  setY(y) {
    this.y = y;

    if (this.y < 0) this.y = 0;
    if (this.y + this.height > this.board_height) this.y = this.board_height - this.height;
  }

  setX(x) {
    this.x = x;

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.board_width) this.x = this.board_width - this.width;
  }

  getPosition() {
    return "x: " + x + ", y: " + y;
  }
}