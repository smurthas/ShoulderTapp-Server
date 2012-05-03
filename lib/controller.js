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
        console.error("DEBUG: err", err);
        cb(err);
      });
    }, function(err) {
      if (err) console.error(err);
      var intvl = config.controller.interval();
      console.error("DEBUG: intvl", intvl);
      setTimeout(exports.crawl, config.controller.interval());
    });
  });
}