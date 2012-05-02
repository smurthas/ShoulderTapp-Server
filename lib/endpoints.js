var circle = require('./circle');


exports.init = function(callback) {
  circle.init(callback);
}

exports.addCloseFriend = function(req, res) {
  var service = req.body.service;
  var from_id = req.body.from_id;
  var user_id = req.body.user_id;
  circle.addCloseFriend(user_id, from_id, service, function(err) {
    if (err) return res.send(500, err);
    res.send(200);
  });
}

exports.deleteCloseFriend = function(req, res) {
  var service = req.body.service;
  var from_id = req.body.from_id;
  var user_id = req.body.user_id;
  circle.deleteCloseFriend(user_id, from_id, service, function(err) {
    if (err) return res.send(500, err);
    res.send(200);
  });
}