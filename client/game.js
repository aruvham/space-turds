var socket;
var player;
var otherPlayers = [];
var running = false;

setup = () => {
  createCanvas(600, 600);


  socket = io.connect('http://10.16.0.68:1337/');
  player = new Player();

  // send initial info to server
  socket.emit('start', player.socketData);


  // receive data from server
  socket.on('heartbeat',
    function(data) {
      otherPlayers = data;



    }
  );
}

draw = () => {
  background(255);

  renderOtherPlayers();
  if(running) {
    player.update();
    player.render();
    
      //render turds
  _.each(player.turds, (turd) => {
    turd.update();
    turd.render();
    if(turd.isOffscreen()) {
      delete player.turds[turd.id];
    }
  });
    
    // send data to server
    socket.emit('update', player.socketData);
  }
}

keyPressed = () => {
  // console.log(keyCode);

  //relative movement

  //set control sensitivity
  let relSpd = 5;
  let trnSpd = 1.5;

  if(keyCode == UP_ARROW) player.fwd = relSpd;
  if(keyCode == DOWN_ARROW) player.bkwd = relSpd;
  if(keyCode == LEFT_ARROW) player.trnL = trnSpd;
  if(keyCode == RIGHT_ARROW) player.trnR = trnSpd;

  //absolute movement
  let absSpd = 5;                           //set control sensitivity
  if(keyCode == 87) player.up = absSpd;       // W
  if(keyCode == 65) player.left = absSpd;  // A
  if(keyCode == 83) player.down = absSpd;  // S
  if(keyCode == 68) player.right = absSpd;  // D

  if(keyCode == 32) player.shooting = true;
}

function keyReleased() {
  // relative movement

  if(keyCode == UP_ARROW) player.fwd = 0;
  if(keyCode == DOWN_ARROW) player.bkwd = 0;
  if(keyCode == LEFT_ARROW) player.trnL = 0;
  if(keyCode == RIGHT_ARROW) player.trnR = 0;

  // absolute movement
  if(keyCode == 87) player.up = 0;       // W
  if(keyCode == 65) player.left = 0;  // A
  if(keyCode == 83) player.down = 0;  // S
  if(keyCode == 68) player.right = 0;  // D

  if(keyCode == 32) player.shooting = false;
}

window.addEventListener("keydown", function(e) {
    // WASD, space and arrow keys
    if([87, 65, 83, 68, 32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

renderOtherPlayers = () => {
  otherPlayers.forEach(player => {

    var id = player.id;

    if(id !== socket.id) {

      var s = 1;  // player's size
      push();     // start new drawing state

      translate(player.x, player.y);
      rotate(player.teta + PI/2);
      translate(0, -4*s);

      // draw triangle
      strokeWeight(3);
      stroke(player.color);
      fill(player.color);
      triangle(0, -3*s, -3*s, 8*s, 3*s, 8*s);

      pop();     // restore previous state

      _.each(player.turds, (turd) => {
        Turd.prototype.render.call(turd);
      });
      
      textSize(16);
      //rect(this.pos.x - 3*s, this.pos.y + 6*s, 6*s, 3*s);
      text(player.name, player.x - 3*s, player.y + 6*s, 6*s, 3*s);
    }
  });

}

$('#player-start').on('click', () => {
  running = true;
  var name = $('#player-name').val();
  var color = $('#player-color').val();
  player = new Player(width/2, height/2);
  player.name = name;
  player.color = color;
  //send initial info to server
  socket.emit('start', player);
});
