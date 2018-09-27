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

knexConnection.migrate.latest()
  // TODO: line below runs seeds. use only for api tests
  // .then(() => {
  //   return knexConnection.seed.run()
  // })
  .then(() => {
    return db.sequelize.sync();
  })
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