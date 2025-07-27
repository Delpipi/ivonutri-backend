const profilnutritionnelModel = require('../database/schemas/profil-nutritionnels');

async function getAllProfilNutritionnels() {
    return await profilnutritionnelModel.find();
}

async function getProfilNutritionnelById(id) {
    return await profilnutritionnelModel.findById(id);
}

async function createProfilNutritionnel(genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies) {
    const profilnutritionnel = new profilnutritionnelModel({
        genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies
    });
    return await profilnutritionnelModel.insertOne(profilnutritionnel);
}

async function updateProfilNutritionnel(id, genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies) {
    return await profilnutritionnelModel.findByIdAndUpdate(
        id,
        {
            genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies
        },
        {new: true}
    );
}

async function deleteProfilNutritionnelById(id) {
    return await profilnutritionnelModel.findByIdAndDelete(id);
}


module.exports = {getAllProfilNutritionnels, getProfilNutritionnelById, createProfilNutritionnel, updateProfilNutritionnel, deleteProfilNutritionnelById}