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
  Foo: sequelize.import('./foo'),
  Bar: sequelize.import('./bar')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;