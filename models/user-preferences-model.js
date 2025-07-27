const prefModel = require('../database/schemas/user-preferences');

async function getAllUserPreferences() {
    return await prefModel.find();
}

async function getUserPreferenceById(id) {
    return await prefModel.findById(id);
}

async function getUserPreferenceByUserId(userId) {
    return await prefModel.findOne({userId: userId});
}

async function getUserPreferenceByUserId(userId) {
    return await prefModel.findOne({userId: userId});
}

async function createUserPreference(userId, alimentsAimes, alimentsEvites, allergies, regime) {
    const userpreferences = new prefModel({
       userId, alimentsAimes, alimentsEvites, allergies, regime
    });
    return await prefModel.insertOne(userpreferences);
}

async function updateUserPreferenceById(id, userId, alimentsAimes, alimentsEvites, allergies, regime) {
    return await prefModel.findByIdAndUpdate(
        id,
        {
           userId, alimentsAimes, alimentsEvites, allergies, regime
        },
        {new: true}
    );
}

async function updateUserPreferenceByUserId(id, userId, alimentsAimes, alimentsEvites, allergies, regime) {
    return await prefModel.findOneAndUpdate(
        {userId: userId},
        {
           userId, alimentsAimes, alimentsEvites, allergies, regime
        },
        {new: true}
    );
}

async function deleteUserPreferenceById(id) {
    return await prefModel.findByIdAndDelete(id);
}


module.exports = {
    getAllUserPreferences,
    getUserPreferenceById,
    getUserPreferenceByUserId,
    createUserPreference,
    updateUserPreferenceById,
    updateUserPreferenceByUserId,
    deleteUserPreferenceById
}