/* global beforeEach */
/* eslint-disable no-console */

const knexConnection = require('../knexConnection');

module.exports = (() => {
  beforeEach(async () => {
    try {
      await knexConnection.seed.run();
    } catch (err) {
      console.log('Error while running knex seeds');
      console.error(err);
    }
  });
})();