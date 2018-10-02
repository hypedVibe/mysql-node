
exports.up = (knex) => knex.schema.hasTable('food')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('food', (table) => {
        table.increments().primary('food_pkey').unsigned();
        table.text('name');
        table.text('description');
        table.date('expirationTime');
        table.boolean('isExpired');
        table.integer('userId', 11).unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      });
    }
  });

exports.down = (knex) => knex.schema.dropTableIfExists('food');
