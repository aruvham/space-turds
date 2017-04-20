class Player {
  constructor(x = width/2, y = height/2) {
    this.pos = {x: x, y: y};
    this.vel = {teta: 3*PI/2, mag: 2};
    this.dir = 0;
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.turds = {};

    this.fwd =0;
    this.bkwd = 0;
    this.trnL = 0;
    this.trnR = 0;

    this.up = 0;
    this.left = 0;
    this.down = 0;
    this.right = 0;

    this.updateSocketData();
  }

  shoot() {
    this.cooldown = true;
    var turd = new Turd(this.pos.x, this.pos.y, this.color, this.vel.teta, 8); //(velX  velY)
    this.turds[turd.id] = turd;
    setTimeout(this.clearCD.bind(this), 200);
  }

  clearCD() {
    this.cooldown = false;
  }

  updateSocketData() {
    this.socketData = {
      x: this.pos.x,
      y: this.pos.y,
      teta: this.vel.teta,
      color: this.color,
      turds: this.turds
    }
  }

  update() {

    // update position
    this.pos.x += (this.fwd - this.bkwd) * Math.cos(this.vel.teta) + this.right - this.left;
    this.pos.y += (this.fwd - this.bkwd) * Math.sin(this.vel.teta) + this.down - this.up;

    // border wrap
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.y < 0) this.pos.y = height;
    if(this.pos.y > height) this.pos.y = 0;

    // update angle of movement
    this.vel.teta += PI/32 * (this.trnR - this.trnL);

    // update speed of movement
    // this.vel.mag = 5 * this.fwd - this.bkwd;

    if(this.shooting && !this.cooldown) {
      this.shoot();
      // setTimeout(this.shoot.bind(this), 8);
    }

    this.updateSocketData();
  }

  render() {
    var s = 1;  // player's size
    push();     // start new drawing state


    translate(this.pos.x, this.pos.y);
    rotate(this.vel.teta + PI/2);
    translate(0, -4*s);

    // draw triangle
    strokeWeight(3);
    stroke(this.color);
    fill(this.color);
    triangle(0, -3*s, -3*s, 8*s, 3*s, 8*s);

    pop();     // restore previous state
  }
}
