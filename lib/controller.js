var async = require('async');

var users = require('./users');
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
      });
    }, function(err) {
      setTimeout(exports.crawl, config.interval());
    });
  });
}