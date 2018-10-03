exports.up = (knex) => knex.schema.hasTable('booked_food')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('booked_food', (table) => {
        table.increments().primary('booked_food_pkey').unsigned();
        table.integer('recipientId', 11).unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
        table.integer('supplierId', 11).unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');        
        table.integer('foodId', 11).unsigned().notNullable().references('id').inTable('food').onDelete('CASCADE');                
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      });
    }
  });

exports.down = (knex) => knex.schema.dropTableIfExists('booked_food');
