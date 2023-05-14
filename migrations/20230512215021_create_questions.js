exports.up = function(knex) {
  return knex.schema.createTable('questions', (table) => {
    table.increments('id').primary();
    table.text('question_text').notNullable();
    table.json('options').notNullable();
    table.integer('correct_option').notNullable();
    table.string('correct_answer');
    table.string('wrong_answer1');
    table.string('wrong_answer2');
    table.string('wrong_answer3');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};
