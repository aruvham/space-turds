function Tetromino() {
  this.flagForDestruction = false;
  this.data = {}  // data used on client side
  this.size = 20; // px

  this.piece = 'SZJLIOT'[Math.floor(random(0, 6))];
  this.data.piece = this.piece;

  this.setInicialPosition();
  this.points = Array.from(this.paths[this.piece]);
  this.points.forEach((point, i) => {
    var newPoint = {};
    newPoint.x = (point.x * this.size) + this.x;
    newPoint.y = (point.y * this.size) + this.y;
    this.points[i] = newPoint;
  });
  this.data.points = this.points;
}

Tetromino.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
  this.points.forEach(point => {
    point.x += this.dx;
    point.y += this.dy;
  });
  this.data.points = this.points;
  if(this.x > width + 5 * this.size,
     this.x < -5 * this.size,
     this.y > height + 5 * this.size,
     this.y < -5 * this.size) this.flagForDestruction = true;
}

Tetromino.prototype.setInicialPosition = function() {
  var r = random();
  var rows = Math.floor(height / this.size);
  var cols = Math.floor(width / this.size);
  if(r < 0.25) {
    // top
    this.x = Math.floor(random(0, cols)) * this.size;
    this.y = -5 * this.size;
    this.dx = 0;
    this.dy = 1;
  } else if(r < 0.5) {
    // right
    this.x = width + 5 * this.size;
    this.y = Math.floor(random(0, rows)) * this.size
    this.dx = -1;
    this.dy = 0;
  } else if(r < 0.75) {
    // bottom
    this.x = Math.floor(random(0, cols)) * this.size;
    this.y = height + 5 * this.size;
    this.dx = 0;
    this.dy = -1;
  } else {
    // left
    this.x = -5 * this.size;
    this.y = Math.floor(random(0, rows)) * this.size
    this.dx = 1;
    this.dy = 0;
  }
}

Tetromino.prototype.paths = {
  'S': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}, {x:  2, y: -1}],
  'Z': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y:  1}, {x:  2, y:  1}],
  'J': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x: -1, y:  2}],
  'L': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x:  1, y:  2}],
  'I': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x:  0, y:  3}],
  'O': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y:  1}, {x:  1, y:  1}],
  'T': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y:  0}, {x:  1, y:  1}]
}

var createTetrisCollider = function(x, y, size) {
  var a = createSprite(x, y, size, size);
  //var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
  //a.addImage(img);
  //a.setSpeed(2.5-(type/2), random(360));
  //a.rotationSpeed = .5;
  a.debug = true;
  //a.type = type;

  a.setCollider("circle", 0, 0, 45);  
  asteroids.push(a);
}
