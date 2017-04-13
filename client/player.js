class Player {
  constructor(x = width/2, y = height/2) {
    this.pos = {x: x, y: y};
    this.vel = {teta: 3*PI/2, mag: 2};
    this.dir = 0;
    this.speed = 0;
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    this.updateSocketData();
  }

  updateSocketData() {
    this.socketData = {
      x: this.pos.x,
      y: this.pos.y,
      teta: this.vel.teta,
      color: this.color
    }
  }

  update() {

    // update position
    this.pos.x += this.vel.mag * Math.cos(this.vel.teta);
    this.pos.y += this.vel.mag * Math.sin(this.vel.teta);

    // border wrap
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.y < 0) this.pos.y = height;
    if(this.pos.y > height) this.pos.y = 0;

    // update angle of movement
    this.vel.teta += PI/32 * this.dir;

    // update speed of movement
    this.vel.mag = 5 * this.speed;

    this.updateSocketData();
  }

  render() {
    var s = 5;  // player's size
    push();     // start new drawing state

    translate(this.pos.x, this.pos.y);
    rotate(this.vel.teta + PI/2);
    translate(0, -4*s);

    // draw triangle
    strokeWeight(2);
    stroke(this.color);
    noFill();
    triangle(0, 0, -3*s, 8*s, 3*s, 8*s);

    // draw centroid
    noStroke();
    fill(this.color);
    ellipse(0, 4*s ,s);

    pop();     // restore previous state
  }
}
