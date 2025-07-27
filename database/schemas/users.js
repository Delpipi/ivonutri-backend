const mongoose = require('mongoose');
require('./profil-nutritionnels');
const schema = mongoose.Schema(
    {
        nom: String,
        email: String,
        role: String,
        langue: String,
        profilNutritionnelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProfilNutritionnels'
        }
    },
    {timestamps: true}
);

const model = mongoose.model('Users', schema);

module.exports = model;