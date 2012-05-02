var express = require('express');
var connect = require('connect');

var endpoints = require('./lib/endpoints');
var config = require('./lib/config');

var app = express.createServer(connect.bodyParser());

app.post('/close_friend', endpoints.addCloseFriend);
app.delete('/close_friend', endpoints.deleteCloseFriend);

app.get('/auth_start', endpoints.authStart);
app.get('/auth_callback', endpoints.authCallback);

endpoints.init(function(err) {
  if (err) return console.error(err);
  app.listen(config.app.port);
  console.log('listening on ' + config.app.port);
});

