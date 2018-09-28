const config = require('./config/index');

module.exports = {
  client: 'mysql2',
  connection: {
    host: config.DB_PORT || '127.0.0.1',
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
  },
  pool: {
    min: 2,
    max: 5
  },
  migrations: {
    directory: './migrations',
  }
};