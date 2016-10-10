class Enemy {
  constructor(id, image, x, y, width, height, angle) {
    this.id = id;
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
  }
}
