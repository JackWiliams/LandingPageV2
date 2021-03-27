const mongoose = require("mongoose");

const LandingPage = mongoose.model(
  "LandingPage",
  new mongoose.Schema({
    landing_name: String,
    created_date: { type: Date, default: Date.now },
    created_by: String,
    modified_date: { type: Date, default: Date.now },
    modified_by: String,
    status: String,
    styles: {},
  })
);

module.exports = LandingPage;
