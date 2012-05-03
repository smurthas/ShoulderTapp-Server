var db = require('./db');

var collection;

exports.init = function(callback) {
  db.init(function(err, _collection) {
    if (err) return callback(err, _collection);
    collection = _collection;
    return callback();
  });
}

exports.addCloseFriend = function(user_id, from_id, service, callback) {
  var update = { $addToSet: {} };
  update.$addToSet[service] = from_id;
  collection.findAndModify({user_id: user_id}, [], update, { upsert: true }, callback);
}

exports.deleteCloseFriend = function(user_id, from_id, service, callback) {
  var update = { $pull: {} };
  update.$pull[service] = from_id;
  collection.findAndModify({user_id: user_id}, [], update, { upsert: true }, callback);
}

exports.ensureAccount = function(user_id, access_token, profiles, callback) {
  var update = { $set: { user_id: user_id, access_token: access_token, profiles: profiles } };
  collection.findAndModify({user_id: user_id}, [], update, { upsert: true }, callback);
}

exports.getAllUsers = function(callback) {
  collection.find({}, function(err, docs) {
    docs.toArray(callback);
  });
}