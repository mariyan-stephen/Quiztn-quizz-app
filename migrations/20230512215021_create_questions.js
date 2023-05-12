exports.up = function(knex) {
  return knex.schema.createTable('questions', (table) => {
    table.increments('id').primary();
    table.text('question_text').notNullable();
    table.json('options').notNullable();
    table.integer('correct_option').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};
