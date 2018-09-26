const Sequelize = require('sequelize');

const config = require('../config/index');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  port: config.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const models = {
  User: sequelize.import('./user'),
  Food: sequelize.import('./food'),
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;