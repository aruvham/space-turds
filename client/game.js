var socket;
var player;

setup = () => {
  createCanvas(600, 600);

  socket = io.connect('http://localhost:3000/');
  player = new Player();
}

draw = () => {
  background(255);
  player.update();
  player.render();
}

keyPressed = () => {
  if(keyCode == UP_ARROW) player.speed = 1;
  if(keyCode == DOWN_ARROW) player.speed = -1;
  if(keyCode == LEFT_ARROW) player.dir = -1;
  if(keyCode == RIGHT_ARROW) player.dir = 1;
}

function keyReleased() {
  if(keyCode == UP_ARROW || keyCode == DOWN_ARROW) player.speed = 0;
  if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) player.dir = 0;
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
