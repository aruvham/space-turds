var turdCounter = 0;

class Turd {
  constructor(x, y, color, dir, spd) {
    this.id = turdCounter;
    turdCounter++
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.spd = spd;
    this.color = color;
  }
  update() {
    this.x += this.spd * Math.cos(this.dir);
    this.y += this.spd * Math.sin(this.dir);
  }
  render() {
    push();

    translate(this.x, this.y);

    // rotate(this.dir);
    translate(0, -4);

    fill('#000');
    ellipse(0, 0, 2);

    pop();     // restore previous state
  }
  isOffscreen() {
    return (
      (this.x < 0)
      || (this.x > width)
      || (this.y < 0)
      || (this.y > height)
    )
  }
}
