const {
    getAllProfilNutritionnels,
    getProfilNutritionnelById,
    createProfilNutritionnel,
    updateProfilNutritionnel,
    deleteProfilNutritionnelById
} = require('../models/profil-nutritionnels-model');

const appError = require('../utilities/app-error');
const httpStatusCodes = require('../utilities/http-status-code');

const profilnutritionnelController = {};

profilnutritionnelController.getAllProfilNutritionnels = async (req, res, next) => {
    const result = await getAllProfilNutritionnels();
    res.status(httpStatusCodes.OK).json(result);
}

profilnutritionnelController.getProfilNutritionnelById = async (req, res, next) => {
    const id = req.params.id
    const result = await getProfilNutritionnelById(id);
   if (result) {
        res.status(httpStatusCodes.OK).json(result);
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Profile non trouvé");
    }
}

profilnutritionnelController.createProfilNutritionnel = async (req, res, next) => {
    const { genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies } = req.body;
    const result = await createProfilNutritionnel(genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies);
    if (result) {
        res.status(httpStatusCodes.CREATED).json({success: true, id: result._id});
    } else {
        throw new appError(httpStatusCodes.BAD_REQUEST, 'Echec de creation du profile');
    }
}

profilnutritionnelController.updateProfilNutritionnel = async (req, res, next) => {
    const id = req.params.id;
    const { genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies } = req.body;
    const result = await updateProfilNutritionnel(
        id, genre, age, poids, taille, niveauActivite, objectif, besoinsCaloriques, pathologies
    );
    if (result) {
        res.status(httpStatusCodes.OK).json({success: true, profilnutritionnel: result});
    } else {
        throw new appError(httpStatusCodes.BAD_REQUEST, 'Echec de la mise à jour du profile');
    }
}

profilnutritionnelController.deleteProfilNutritionnelById = async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteProfilNutritionnelById(id);
    if (result) {
        res.status(httpStatusCodes.NO_CONTENT).send();
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Profile non trouvé");
    }
}

module.exports = profilnutritionnelController;