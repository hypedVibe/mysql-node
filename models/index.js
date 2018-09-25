const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodedb', 'root', 'true', {
  host: 'localhost',
  dialect: 'mysql',
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