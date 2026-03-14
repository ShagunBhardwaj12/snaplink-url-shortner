const pool = require("../config/db");

exports.saveUrl = async (originalUrl, shortCode) => {
  await pool.query(
    "INSERT INTO urls (original_url, short_code) VALUES ($1,$2)",
    [originalUrl, shortCode],
  );
};

exports.getAllUrls = async () => {
  const result = await pool.query(
    "SELECT * FROM urls ORDER BY created_at DESC",
  );

  return result.rows;
};
