/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const db = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

db.sequelize.sync()
  .then(() => {
    app.listen(8080, (err) => {
      if (err) {
        console.log(err);
      }
    
      console.log('Server is listening on port 8080');
    });
  })
  .catch((err) => {
    console.error(err);
  });
