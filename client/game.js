var socket;

setup = () => {
  socket = io.connect('http://localhost:3000/');
  createCanvas(600, 600);
  background(51);
}

draw = () => {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 20);
}
