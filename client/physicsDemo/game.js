var asteroids;
var tetrisColliders;
var tetromino;
var size = 20;
var colors = Render.colors.bg;

Render.size = size;
Generate.size = size;

setup = () => {
  createCanvas(600, 600);
  tetromino = [new Tetromino(), new Tetromino()];
  setInterval(() => {
    tetromino.shift();
    tetromino.shift();
    tetromino.push(new Tetromino());
    tetromino.push(new Tetromino());
  }, 14000);
  
  asteroids = new Group();
  tetrisColliders = new Group();
  
  createAsteroid(1, width/2, height/2);
  createAsteroid(2, width/2, height/2);
  createAsteroid(3, width/2, height/2);
  createAsteroid(1, width/2, height/2);
  createAsteroid(2, width/2, height/2);
  createAsteroid(3, width/2, height/2);
}

draw = () => {
  background(colors[0]);
  tetromino.forEach(t => {
    t.update();
    Render.tetromino(t.data);
  });
  
  // asteroid wrap
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-0) s.position.x = width+0;
  if(s.position.x>width+0) s.position.x = -0;
  if(s.position.y<-0) s.position.y = height+0;
  if(s.position.y>height+0) s.position.y = -0;
    
  // collision
  s.bounce(asteroids);
  }
  
  
  
  // sprites
  drawSprites();
}

var createAsteroid = function(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  a.debug = true;
  a.type = type;

  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;

  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 45);  
  asteroids.push(a);
}
