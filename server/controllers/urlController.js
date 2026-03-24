const urlService = require("../services/urlServices");
const auth = require("../middleware/auth");
exports.createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortUrl = await urlService.createShortUrl(url);

    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    const links = await urlService.getAllLinks();

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
