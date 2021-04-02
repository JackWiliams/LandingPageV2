const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.landingPage = require("./landingPage.model");
db.landingTemplate = require("./landingTemplate.model");
db.customBlock = require("./customBlock.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
