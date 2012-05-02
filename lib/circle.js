var db = require('./db');

var collection;

exports.init = function(callback) {
  db.init(callback);
}

exports.addCloseFriend = function(user_id, from_id, service, callback) {
  var update = { circle: { $addToSet: {} } };
  update.circle.$addToSet[service] = from_id;
  collection.findAndModify({user_id: user_id}, [[]], update, {upsert:true}, callback);
}

exports.addDeleteFriend = function(user_id, from_id, service, callback) {
  var update = { circle: { $addToSet: {} } };
  update.circle.$addToSet[service] = from_id;
  collection.findAndModify({user_id: user_id}, [[]], update, {upsert:true}, callback);
}