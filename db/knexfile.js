const dbConfig={
  host: "127.0.0.1",
  port: 5432,
  database: "graphql_db",
  user: "postgres",
  password: "123456",
  ssl: false
}

module.exports = {
  development: {
    client: 'pg',
    connection: dbConfig,
    ssl: {
      rejectUnauthorized: true,
    },
  }
};
