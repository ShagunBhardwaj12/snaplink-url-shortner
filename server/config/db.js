const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "snaplink_url_shortner",
  password: "Diyasha66#",
  port: 5432,
});

module.exports = pool;
