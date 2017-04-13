var express = require('express');
var socket = require('socket.io');

var app = express();

var players = [];

// create server
var server = app.listen(3000, '0.0.0.0');
console.log('Server is now running...');
// serve static files
app.use(express.static('client'));

var io = socket(server);

setInterval(heartbeat, 33);
function heartbeat() {
  console.log(players);
  io.sockets.emit('heartbeat', players);
}

io.sockets.on('connection',

  function(socket) {

    console.log("We have a new client: " + socket.id);

    socket.on('start',
      function(data) {
        console.log(socket.id + " " + data.x + " " + data.y + " " + data.color);
        var player = {
          id: socket.id,
          x: data.x,
          y: data.y,
          teta: data.teta,
          color: data.color
        }
        players.push(player);
      }
    );

    socket.on('update',
      function(data) {

        for (var i = 0; i < players.length; i++) {
          if (socket.id == players[i].id) {
            players[i].x = data.x
            players[i].y = data.y
            players[i].teta = data.teta;
          }
        }

      }
    );

    socket.on('disconnect', function() {
      for (var i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          players.splice(i, 1);
        }
      }
    });
  }
);
