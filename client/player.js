class Player {
  constructor(x = width/2, y = height/2) {
    this.pos = {x: x, y: y};
    this.vel = 0;
    this.dir = 3*PI/2;
    this.color = 51;
  }

  update() {
    this.pos.x += this.vel * Math.cos(this.dir);
    this.pos.y += this.vel * Math.sin(this.dir);
  }

  render() {
    var s = 5;  // player's size
    push();     // start new drawing state

    translate(this.pos.x, this.pos.y);
    rotate(this.dir + PI/2);
    translate(0, -4*s);

    // draw triangle
    strokeWeight(2);
    stroke(0);
    noFill();
    triangle(0, 0, -3*s, 8*s, 3*s, 8*s);

    // draw centroid
    noStroke();
    fill(255,0,0);
    ellipse(0, 4*s ,s);

    pop();     // restore previous state
  }
}
