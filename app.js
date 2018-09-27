/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/index');
const routes = require('./routes');
const db = require('./models/index');

const knexConnection = require('./knexConnection');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

// running migrations and syncing sequelize
(async () => {
  try {
    console.log('Setting up db');
    await knexConnection.migrate.latest();
    await db.sequelize.sync();
  } catch (err) {
    console.log('Error while setting up db');
    console.error(err);
  }
})();

app.listen(config.APP_PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is listening on port ${config.APP_PORT}`);
});

module.exports = app;