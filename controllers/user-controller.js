const {getAllUsers, getUserById, createUser, updateUser,deleteUserById} = require('../models/user-model');
const appError = require('../utilities/app-error');
const httpStatusCodes = require('../utilities/http-status-code');

const userController = {};

userController.getAllUsers = async (req, res, next) => {
    const result = await getAllUsers();
    res.status(httpStatusCodes.OK).json(result);
}

userController.getUserById = async (req, res, next) => {
    const id = req.params.id
    const result = await getUserById(id);
   if (result) {
        res.status(httpStatusCodes.OK).json(result);
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Utilisateur non trouvé");
    }
}

userController.createUser = async (req, res, next) => {
    const { nom, email, role, langue, profilNutritionnelId } = req.body;
    const result = await createUser(nom, email, role, langue, profilNutritionnelId);
    if (result) {
        res.status(httpStatusCodes.CREATED).json({success: true});
    } else {
        throw new appError(httpStatusCodes.BAD_REQUEST, `Echec de creation de l'utilisateur ${nom}`);
    }
}

userController.updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { nom, email, role, langue, profilNutritionnelId } = req.body;
    const result = await updateUser(id, nom, email, role, langue, profilNutritionnelId);
    if (result) {
        res.status(httpStatusCodes.OK).json({success: true, user: result});
    } else {
        throw new appError(httpStatusCodes.BAD_REQUEST, `Echec de mise  à jour de l'utilisateur ${nom}`);
    }
}

userController.deleteUserById = async (req, res, next) => {
    const id = req.params.id;
    const result = await deleteUserById(id);
    if (result) {
        res.status(httpStatusCodes.NO_CONTENT).send();
    } else {
        throw new appError(httpStatusCodes.NOT_FOUND, "Utilisateur non trouvé");
    }
}


module.exports = userController;