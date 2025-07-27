const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        userId: String,
        alimentsAimes: [String],
        alimentsEvites: [String],
        allergies: [String],
        regimes: [String]
    },
    {timestamps: true}
);

const model = mongoose.model('UserPreferences', schema);

module.exports = model;