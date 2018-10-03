/* eslint-disable no-console */

const user = require('./data/users');
const food = require('./data/food');
const bookedFood = require('./data/bookedFood');

const seedData = [
  user,
  food,
  // bookedFood
];

exports.seed = async function(knex) {
  for(let i = 0; i < seedData.length; i++) {
    try {
      await knex('knex_migrations_lock').del();
      await knex(seedData[i].table).del();
      await knex(seedData[i].table).insert(seedData[i].data);
    } catch(err) {
      console.error('Error while seeding');
      console.error(`Table name ${seedData[i].table}`);
      console.error('Error: ');
      console.error(err);
    }
  }
};
