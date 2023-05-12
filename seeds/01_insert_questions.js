exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          question_text: 'What is the capital of France?', 
          options: JSON.stringify(['Paris', 'Berlin', 'Madrid', 'Rome']),
          correct_option: 0,
        },
        // more questions...
      ]);
    });
};
