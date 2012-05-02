var request = require('request');
var querystring = require('querystring');

var hostUrl = 'https://carealot.singly.com';
var client_id, client_secret, redirect_uri;

exports.init = function(_client_id, _client_secret, _redirect_uri) {
  client_id = _client_id;
  client_secret = _client_secret;
  redirect_uri = _redirect_uri;
}

exports.apiCall = function(endpoint, params, callback) {
  var url = hostUrl + endpoint + '?' + querystring.stringify(params);
  request.get({url:url, json:true}, function(err, resp, body) {
    return callback(err, body);
  });
}

exports.getAuthorizeURL = function(service) {
  return hostUrl + '/oauth/authorize?' + querystring.stringify({
    client_id: client_id,
    redirect_uri: redirect_uri,
    service: service
  });
}

exports.getAccessToken = function(code, callback) {
  var post = {
    uri:hostUrl+'/oauth/access_token',
    body:querystring.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: code
    }),
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
  };
  request.post(post, function (err, resp, body) {
    if (err) return callback(err, body);
    try {
      body = JSON.parse(body);
    } catch(err) {
      return callback(err, body);
    }
    callback(null, body);
  });
}