var config = {
  auth: {
    client_id: get('SINGLY_CLIENT_ID'),
    client_secret: get('SINGLY_CLIENT_SECRET')
  },
  db: {
    host: get('DB_HOST', 'localhost'),
    port: get('DB_PORT', 27017),
    name: get('DB_NAME', 'shoulder'),
    collection: get('DB_COLLECTION', 'users')
  },
  app: {
    host: get('HOST', 'localhost'),
    port: get('PORT', 8080)
  }
};

config.app.url = generateURL();

config.auth.redirect_uri = config.app.url + '/auth_callback';

function get(name, _default) {
  return process.env[name] || _default;
}

function generateURL() {
  if (config.app.host === 'localhost') return 'http://localhost:' + config.app.port;
  return 'http://' + config.app.host;
}

module.exports = config;