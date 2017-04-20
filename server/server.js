var express = require('express');
var socket = require('socket.io');
var _ = require('underscore');
// var Turd = require('./models');

var app = express();

var players = [];
var turds = {};

// create server
var port = 1337;
var server = app.listen(port, '0.0.0.0');
console.log('Server running on localhost ' + port);
// serve static files
app.use(express.static('client'));

var io = socket(server);

setInterval(heartbeat, 16.6666667);
function heartbeat() {
  // console.log(players);
  io.sockets.emit('heartbeat', players);
  _.each(turds, (turd) => {
    if(turd.delete) {
      delete turds[turd.id];
    }
  });
  // console.log(turds);
}

io.sockets.on('connection',

  function(socket) {

    console.log("We have a new client: " + socket.id);

    socket.on('start',
      function(data) {
        console.log(socket.id + " " + data.x + " " + data.y + " " + data.color);
        var player = {
          id: socket.id,
          name: data.name,
          color: data.color,
          x: data.x,
          y: data.y,
          teta: data.teta
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
            players[i].turds = data.turds;
            // console.log(players[i].turds);
          }
        }

        // _.extend(turds, data.turds);
        // console.log(turds);

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
