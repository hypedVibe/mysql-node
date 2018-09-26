/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/index');
const routes = require('./routes');
const db = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

db.sequelize.sync()
  .then(() => {
    app.listen(config.APP_PORT, (err) => {
      if (err) {
        console.log(err);
      }
    
      console.log(`Server is listening on port ${config.APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;