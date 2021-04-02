const mongoose = require("mongoose");

const CustomBlock = mongoose.model(
  "CustomBlock",
  new mongoose.Schema({
    block_name: String,
    label: String,
    imgSrc: String,
    category: String,
    html_components: String,
    styles: {},
  })
);

module.exports = CustomBlock;
