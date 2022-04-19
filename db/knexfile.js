const pg = require('pg');

pg.defaults.ssl = {
  rejectUnauthorized: false,
};

global.Promise = require('bluebird');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: "127.0.0.1",
      port: 5432,
      database: "graphql_db",
      user: "postgres",
      password: "123456",
      ssl: false
    },
    ssl: {
      rejectUnauthorized: true,
    },
  }
};
