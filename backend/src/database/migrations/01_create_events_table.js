
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.dateTime('eventStartTime').notNullable();
        table.dateTime('eventEndTime').notNullable();

        table.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('events')
  };
  
