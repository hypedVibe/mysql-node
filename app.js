const express = require('express')
const Sequelize = require('sequelize')

// TODO: connect to db in another file
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
})
//

// TODO: define models in another directory
const Foo = sequelize.define('foo', {
  option: Sequelize.TEXT
})
//

const app = express()

// TODO: end-points to another folder
app.get('/smth', async (req, res) => {
  const foo = await Foo.create({ option: 'OMG' })
  res.send(foo)
})

app.listen(8080, (err) => {
  if (err) {
    console.log(err)
  }

  console.log('Server is listening on port 8080')
})