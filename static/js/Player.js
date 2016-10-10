class Player {
  constructor(x, y, radius, speed, pipeLength, pipeWidth, board_width, board_height) {
    this.x = x;
    this.y = y;
    this.radius = radius
    this.speed = speed;
    this.pipeLength = pipeLength;
    this.pipeWidth = pipeWidth;
    this.board_width = board_width;
    this.board_height = board_height;
    this.angle = 0;
    this.id = undefined;
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
    if (this.y - this.radius < 0) this.y = this.radius;
    if (this.y + this.radius > this.board_height) this.y = this.board_height - this.radius;
  }

  setX(x) {
    this.x = x;
    if (this.x - this.radius < 0) this.x = this.radius;
    if (this.x + this.radius > this.board_width) this.x = this.board_width - this.radius;
  }

  getPosition() {
    return "x: " + x + ", y: " + y;
  }

  getXPos() {
    return this.x;
  }

  getYPos() {
    return this.y;
  }

  setId(id) {
    console.log("Player given id: " + id);
    this.id = id;
  }
}
