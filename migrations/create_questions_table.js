exports.up = function(knex) {
  return knex.schema.createTable('questions', function(table) {
    table.increments('id');
    table.string('question_text');
    table.string('correct_answer');
    table.string('wrong_answer1');
    table.string('wrong_answer2');
    table.string('wrong_answer3');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};
