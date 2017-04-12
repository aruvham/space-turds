var express = require('express');
var app = express();

var socket = require('socket.io');

// create server
var server = app.listen(3000);

// serve static files
app.use(express.static('client'));
