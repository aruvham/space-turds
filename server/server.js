var express = require('express');
var app = express();

// create server
var server = app.listen(3000);

// serve static files
app.use(express.static('client'));
