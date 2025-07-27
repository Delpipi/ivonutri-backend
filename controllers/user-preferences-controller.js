const {
    getAllUserPreferences,
    getUserPreferenceById,
    getUserPreferenceByUserId,
    createUserPreference,
    updateUserPreferenceById,
    updateUserPreferenceByUserId,
    deleteUserPreferenceById,
    
} = require('../models/user-preferences-model');

const appError = require('../utilities/app-error');
const httpStatusCodes = require('../utilities/http-status-code');

const userpreferenceController = {};

userpreferenceController.getAllUserPreferences = async (req, res, next) => {
    const result = await getAllUserPreferences();
    res.status(httpStatusCodes.OK).json(result);
}

userpreferenceController.getUserPreferenceById = async (req, res, next) => {
    const id = req.params.id
    const result = await getUserPreferenceById(id);
   if (result) {
        res.status(httpStatusCodes.OK).json(result);
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Préferences non trouvé");
    }
}

userpreferenceController.getUserPreferenceByUserId = async (req, res, next) => {
    const userId = req.params.id
    const result = await getUserPreferenceByUserId(userId);
   if (result) {
        res.status(httpStatusCodes.OK).json(result);
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Préferences non trouvé");
    }
}

userpreferenceController.createUserPreference = async (req, res, next) => {
    const { userId, alimentsAimes, alimentsEvites, allergies, regime } = req.body;
    const result = await createUserPreference(userId, alimentsAimes, alimentsEvites, allergies, regime);
    if (result) {
        res.status(httpStatusCodes.CREATED).json({success: true});
    } else {
        throw new appError(httpStatusCodes.BAD_REQUEST, 'Echec de creation de la préference');
    }
}

userpreferenceController.updateUserPreferenceById = async (req, res, next) => {
    const id = req.params.id;
    const { userId, alimentsAimes, alimentsEvites, allergies, regime } = req.body;
    const result = await updateUserPreferenceById(
        id,userId, alimentsAimes, alimentsEvites, allergies, regime
    );
    if (result) {
        res.status(httpStatusCodes.OK).json({success: true, userpreference: result});
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, 'Préferences non trouvé');
    }
}

userpreferenceController.updateUserPreferenceByUserId = async (req, res, next) => {
    const id = req.params.id;
    const { userId, alimentsAimes, alimentsEvites, allergies, regime } = req.body;
    const result = await updateUserPreferenceByUserId(
        id, userId, alimentsAimes, alimentsEvites, allergies, regime
    );
    if (result) {
        res.status(httpStatusCodes.OK).json({success: true, userpreference: result});
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, 'Préferences non trouvé');
    }
}

userpreferenceController.deleteUserPreferenceById = async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteUserPreferenceById(id);
    if (result) {
        res.status(httpStatusCodes.NO_CONTENT).send();
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Préferences non trouvé");
    }
}

module.exports = userpreferenceController;