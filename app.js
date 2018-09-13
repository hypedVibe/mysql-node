const express = require('express');
const Sequelize = require('sequelize');

const db = require('./models/index');

const app = express();

// TODO: end-points to another folder
app.get('/smth', async (req, res) => {
  const foo = await db.Foo.create({ name: 'OMG' });
  res.send(foo);
});

db.sequelize.sync()
  .then(() => {
    app.listen(8080, (err) => {
      if (err) {
        console.log(err);
      };
    
      console.log('Server is listening on port 8080');
    });
  })
  .catch((err) => {
    console.error(err);
  });
