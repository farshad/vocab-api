var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'vocab'
    },
    port: 3000,
    db: 'mongodb://localhost/vocab-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'vocab'
    },
    port: 3000,
    db: 'mongodb://localhost/vocab-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'vocab'
    },
    port: 3000,
    db: 'mongodb://localhost/vocab'
  }
};

module.exports = config[env];
