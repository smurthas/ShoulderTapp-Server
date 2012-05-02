var db = require('./db');

var collection;

exports.init = function(callback) {
  db.init(function(err, _collection) {
    if (err) return callback(err, _collection);
    collection = _collection;
    callback();
  });
}

exports.addCloseFriend = function(user_id, from_id, service, callback) {
  var update = { circle: { $addToSet: {} } };
  update.circle.$addToSet[service] = from_id;
  collection.findAndModify({user_id: user_id}, [], update, { upsert: true }, callback);
}

exports.deleteCloseFriend = function(user_id, from_id, service, callback) {
  var update = { circle: { $pull: {} } };
  update.circle.$pull[service] = from_id;
  collection.findAndModify({user_id: user_id}, [], update, { upsert: true }, callback);
}

exports.ensureAccount = function(user_id, profiles, callback) {
  var update = { $set: { user_id: user_id, profiles: profiles } };
  collection.findAndModify({user_id: user_id}, [], update, { update: true }, callback);
}