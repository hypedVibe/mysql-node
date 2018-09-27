const user = require('./data/users');

const seedData = [
  user,
];

exports.seed = function(knex, Promise) {
  for(let i = 0; i < seedData.length; i++) {
    return knex(seedData[i].table).del()
      .then(() => {
        return knex(seedData[i].table).insert(seedData[i].data)
      });
  }
};
