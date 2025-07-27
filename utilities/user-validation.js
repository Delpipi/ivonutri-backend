const { param, body, validationResult } = require('express-validator');
const httpStatusCodes = require('./http-status-code');
const Validate = {};

const roles = [
    "utilisateur",
    "admin"
]

/****************************
***** VALIDATION RULES  *****
*****************************/
Validate.userIdRules = () => {
    //Valid user id required
    return [
        param("id")
            .trim()
            .notEmpty().withMessage("L'identifiant est requis")
            .isMongoId().withMessage("L'identifiant de l'utilisateur est invalide")
    ]
}

Validate.userRules = () => {
    //Valid contact id required
    return [
        body("nom")
            .trim()
            .notEmpty().withMessage('Merci de saisir votre Nom et Prénom')
            .isString()
            .isLength({ min: 2, max: 30 }).withMessage("Le nom complet (nom et prénom) doit contenir entre 2 et 100 caractères"),
        
        body("email")
            .trim()
            .notEmpty().withMessage('Merci de saisir votre email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Merci de saisir un email valide'),
        
        body("role")
            .trim()
            .notEmpty().withMessage('Votre profile est requis')
            .isString()
            .custom((roles) => roles.every(role => roles.includes(role)))
            .withMessage("Merci de spécifié un profile valide"),
        
        body("langue")
            .isString()
            .isLength({min: 2, max: 2})
            .withMessage("Merci de selectionner une langue valide"),
        
        body("profilNutritionnelId")
            .optional()
            .isString()
            .isMongoId("Votre profil nutritionnel est invalide")
    ]
}

/****************************
***** CHECK RULES  **********
*****************************/
Validate.checkRules = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({[err.path]: err.msg }))
        return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: extractedErrors,
        });
    }
    next();
}


module.exports = Validate;