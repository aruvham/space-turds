var express = require('express');
var socket = require('socket.io');

var app = express();

// create server
var server = app.listen(3000);
console.log('Server is now running...');
// serve static files
app.use(express.static('client'));

var io = socket(server);

io.sockets.on('connection', (data) => {
  console.log('New connection: ', data.id);
});
