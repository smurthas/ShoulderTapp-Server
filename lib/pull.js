var async = require('async');

var singly = require('./singly');

var endpoints = {
  facebook: 'home',
  twitter: 'timeline'
}
var from = {
  facebook: function(data) { return data && data.from && data.from.id; },
  twitter: function(data) { return data && data.user && data.user.id_str; }
}
exports.crawl = function(user, callback, onMatch) {
  var services = [];
  for(var i in user.profiles) {
    if (i !== 'all' && i !== 'id') services.push(i);
  }
  async.forEach(services, function(service, cb) {
    singly.apiCall('/services/' + service + '/' + endpoints[service], {access_token: user.access_token, limit:100},
    function(err, data) {
      // console.error("DEBUG: user[service]", user[service]);
      for(var i in data) {
        var post_from_id = from[service](data[i].data);
        // console.error("DEBUG: id", id);
        for(var j in user[service]) {
          var friend_id = user[service][j];
          if( friend_id == post_from_id ) onMatch(user.profiles.id, data[i].data);
        }
      }
      cb();
    })
  }, callback);
}