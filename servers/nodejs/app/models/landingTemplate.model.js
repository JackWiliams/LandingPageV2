const mongoose = require("mongoose");

const LandingTemplate = mongoose.model(
  "LandingTemplate",
  new mongoose.Schema({
    template_name: String,
    category: String,
    category_type: Number,
    imgSrc: String,
    styles: {},
  })
);

module.exports = LandingTemplate;
