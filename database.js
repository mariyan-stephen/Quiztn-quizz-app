const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'quiztn_db',
  user: 'tinke',
  password: 'toordaal'
});

module.exports = db;
