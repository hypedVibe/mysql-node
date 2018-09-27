const config = require('./config/index');

module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
  },
  migrations: {
    directory: './migrations',
  }
};