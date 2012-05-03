var async = require('async');

var users = require('./users');
var config = require('./config');
var pull = require('./pull');


exports.start = function() {
  exports.crawl();
}

exports.crawl = function() {
  users.getAllUsers(function(err, users) {
    async.forEachSeries(users, function(user, cb) {
      console.error("DEBUG: user", user);
      pull.crawl(user, function(err) {
        cb(err);
      }, function(user_id, obj) {
        console.log('ALERT', user_id, obj);
      });
    }, function(err) {
      if (err) console.error(err);
      var intvl = config.controller.interval();
      setTimeout(exports.crawl, config.controller.interval());
    });
  });
}