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
exports.crawl = function(user, callback) {
  var services = [];
  for(var i in user.profiles) {
    console.error("DEBUG: i", i);
    if (i !== 'all' && i !== 'id') {
      services.push(i);
    }
  }
  async.forEach(services, function(service, cb) {
    singly.apiCall('/services/' + service + '/' + endpoints[service], {access_token: user.access_token},
    function(err, data) {
      for(var i in data) {
        console.error('DEBUG: ' + service + ':' + from[service](data[i].data));
      }
      cb();
    })
  }, callback);
}