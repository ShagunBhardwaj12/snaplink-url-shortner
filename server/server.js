const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./config/db");
app.get("/:shortCode", async (req, res) => {

  const { shortCode } = req.params;

  try {

    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_code=$1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("URL not found");
    }

    const originalUrl = result.rows[0].original_url;

     await pool.query(
       "UPDATE urls SET click_count = click_count + 1 WHERE short_code=$1",
       [shortCode],
     );

    res.redirect(originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
const urlRoutes = require("./routes/urlRoutes");


app.use(cors());
app.use(express.json());

app.use("/api", urlRoutes);

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
