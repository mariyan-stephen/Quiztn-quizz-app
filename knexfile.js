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
      tableName: 'knex_migrations',
      directory: 'C:/Users/tinke/OneDrive/Desktop/quiztn-quizz-app/migrations' // path to your migrations directory
    }
  }
};
