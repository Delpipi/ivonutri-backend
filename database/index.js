const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const db = {};
db.url = process.env.MONGODB_URI;
db.mongoose = mongoose;

module.exports = db;