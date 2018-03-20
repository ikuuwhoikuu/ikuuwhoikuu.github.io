class Cell {
  constructor (x, y, side) {
    this.pos = createVector(x, y);
    this.side = side;
    this.brightness = 80;
  }
  draw () {
    fill(this.brightness);
    rect(this.pos.x, this.pos.y, this.side, this.side);
  }
}
