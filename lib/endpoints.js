var request = require('request');

var singly = require('./singly');
var config = require('./config');
var users = require('./users');

singly.init(config.auth.client_id, config.auth.client_secret, config.auth.redirect_uri);

exports.init = function(callback) {
  users.init(callback);
}

exports.addCloseFriend = function(req, res) {
  var service = req.body.service;
  var from_id = req.body.from_id;
  var user_id = req.body.user_id;
  users.addCloseFriend(user_id, from_id, service, function(err) {
    if (err) return res.send(500, err);
    res.send(200);
  });
}

exports.deleteCloseFriend = function(req, res) {
  var service = req.body.service;
  var from_id = req.body.from_id;
  var user_id = req.body.user_id;
  users.deleteCloseFriend(user_id, from_id, service, function(err) {
    if (err) return res.send(500, err);
    res.send(200);
  });
}

exports.authCallback = function(req, res) {
  singly.getAccessToken(req.param('code'), function(err, data) {
    if (err) return res.send(500, err);
    singly.apiCall('/profiles', {access_token:data.access_token}, function(err, profiles) {
      if (err) return res.send(500, err);
      users.ensureAccount(profiles.id, profiles, function(err, user) {
        if (err) return res.send(500, err);
        var info = {
          access_token: data.access_token,
          profiles: profiles
        }
        res.send('<script>var info = ' + JSON.stringify(info));
      });
    });
  });
}

exports.authStart = function(req, res) {
  res.redirect(singly.getAuthorizeURL(req.param('service')));
}