const userModel = require('../database/schemas/users');

async function getAllUsers() {
    return await userModel.find().populate('profilNutritionnelId');
}

async function getUserById(id) {
    return await userModel.findById(id).populate('profilNutritionnelId');
}

async function getUserByCustomKey(key, value) {
    return await userModel.findOne({key: value}).populate('profilNutritionnelId');
}

async function createUser(nom, email, role, googleId, langue, profilNutritionnelId) {
    const user = new userModel({
        nom,
        email,
        role,
        googleId,
        langue,
        profilNutritionnelId
    });
    return await userModel.insertOne(user);
}

async function updateUser(id, nom, email, role, googleId, langue, profilNutritionnelId) {
    return await userModel.findByIdAndUpdate(
        id,
        {
            nom,
            email,
            role,
            googleId,
            langue,
            profilNutritionnelId
        },
        {new: true}
    );
}

async function deleteUserById(id) {
    return await userModel.findByIdAndDelete(id);
}


module.exports = {getAllUsers, getUserById,getUserByCustomKey, createUser, updateUser, deleteUserById}