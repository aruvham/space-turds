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
