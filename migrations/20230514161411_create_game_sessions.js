exports.up = function(knex) {
  return knex.schema.createTable('game_sessions', function(table) {
    table.increments('id').primary();
    table.integer('user1_id').references('id').inTable('users').notNullable();
    table.integer('user2_id').references('id').inTable('users').notNullable();
    table.integer('user1_score').defaultTo(0);
    table.integer('user2_score').defaultTo(0);
    table.integer('current_question_id').references('id').inTable('questions');
    table.integer('question_number').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('game_sessions');
};
