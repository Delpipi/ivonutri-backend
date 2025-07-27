const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        genre: String,
        age: Number,
        poids: Number,
        taille: Number,
        niveauActivite: String,
        objectif: String,
        besoinsCaloriques: Number,
        pathologies: [String]
    },
    {timestamps: true}
);

const model = mongoose.model('ProfilNutritionnels', schema);

module.exports = model;
