var socket;
var player;
var otherPlayers = [];

setup = () => {
  createCanvas(600, 600);

  socket = io.connect('http://10.16.0.70:3000/');
  player = new Player();

  // send initial info to server
  socket.emit('start', player.socketData);

  // receive data from server
  socket.on('heartbeat',
    function(data) {
      //console.log(data);
      otherPlayers = data;
    }
  );
}

draw = () => {
  background(255);
  player.update();
  player.render();

  renderOtherPlayers();

  // send data to server
  socket.emit('update', player.socketData);
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

renderOtherPlayers = () => {
  otherPlayers.forEach(player => {

    var id = player.id;

    if(id !== socket.id) {

      var s = 5;  // player's size
      push();     // start new drawing state

      translate(player.x, player.y);
      rotate(player.teta + PI/2);
      translate(0, -4*s);

      // draw triangle
      strokeWeight(2);
      stroke(player.color);
      noFill();
      triangle(0, 0, -3*s, 8*s, 3*s, 8*s);

      // draw centroid
      noStroke();
      fill(player.color);
      ellipse(0, 4*s ,s);

      pop();     // restore previous state

    }
  });
}
