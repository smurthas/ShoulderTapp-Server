var express = require('express');
var connect = require('connect');

var endpoints = require('./lib/endpoints');

var app = express.createServer(connect.bodyParser());

app.post('/close_friend', endpoints.addCloseFriend);
app.delete('/close_friend', endpoints.deleteCloseFriend);

endpoints.init(function() {
  app.listen(process.env.PORT || 8080);
});