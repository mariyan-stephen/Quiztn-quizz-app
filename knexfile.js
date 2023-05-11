module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'tinke',
      password : 'toordaal',
      database : 'quiztn_db' // replace with your PostgreSQL database name
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
