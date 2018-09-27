
exports.up = (knex, Promise) => knex.schema.hasTable('user')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('user', (table) => {
        table.increments().primary('user_pkey');
        table.text('firstName');
        table.text('lastName');
        table.specificType('email', 'VARCHAR(200)');
        table.integer('age');
        table.integer('rate');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.unique('email', 'user_email_key');
      });
    }
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('user');
