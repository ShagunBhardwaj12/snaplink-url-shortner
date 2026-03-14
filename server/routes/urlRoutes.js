const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const pool = require("../config/db");

router.post("/shorten", async (req, res) => {
  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = nanoid(6);

  await pool.query(
    "INSERT INTO urls (original_url, short_code) VALUES ($1,$2)",
    [url, shortCode],
  );

  res.json({
    shortUrl: `http://localhost:5000/${shortCode}`,
  });
});


router.get("/links", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM urls ORDER BY created_at DESC",
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
