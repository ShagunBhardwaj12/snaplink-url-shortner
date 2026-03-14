const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./config/db");

app.use(cors());
app.use(express.json());

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
