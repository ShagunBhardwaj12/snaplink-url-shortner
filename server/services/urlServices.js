const { nanoid } = require("nanoid");
const urlModel = require("../models/urlModel");

exports.createShortUrl = async (originalUrl) => {
  const shortCode = nanoid(6);

  await urlModel.saveUrl(originalUrl, shortCode);

  return `http://localhost:5000/${shortCode}`;
};

exports.getAllLinks = async () => {
  return await urlModel.getAllUrls();
};
