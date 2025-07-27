const { param, body, validationResult } = require('express-validator');
const httpStatusCodes = require('./http-status-code');
const Validate = {};

const niveauActivites = [
    "Sédentaire (pas de sport)",
    "Légèrement actif (1-3 j/semaine)",
    "Modérément actif (3-5 j/semaine)",
    "Très actif (6-7 j/semaine)",
    "Extrêmement actif (2x par jour)"
]

const objectifsDisponibles = [
  "Perdre du poids",
  "Prendre du poids",
  "Maintenir son poids",
  "Mieux manger",
  "Préparation sportive",
  "Gérer une maladie"
];

/****************************
***** VALIDATION RULES  *****
*****************************/
Validate.IdRules = () => {
    //Valid user id required
    return [
        param("id")
            .trim()
            .notEmpty().withMessage("L'identifiant est requis")
            .isMongoId().withMessage("L'identifiant est invalide")
    ]
}

Validate.profilNutritionnelsRules = () => {
    //Valid contact id required
    return [
        body("genre")
            .notEmpty().withMessage("Le genre est requis.")
            .isString().withMessage("Le genre doit être une chaîne de caractères (ex. : 'homme', 'femme', 'autre')."),

        body("age")
            .notEmpty().withMessage("L'âge est requis.")
            .isInt({ min: 0, max: 120 }).withMessage("L'âge doit être un nombre entier entre 0 et 120."),

        body("poids")
            .notEmpty().withMessage("Le poids est requis.")
            .isFloat({ min: 0 }).withMessage("Le poids doit être un nombre positif (en kg)."),

        body("taille")
            .notEmpty().withMessage("La taille est requise.")
            .isFloat({ min: 0 }).withMessage("La taille doit être un nombre positif (en cm)."),

        body("niveauActivite")
            .notEmpty().withMessage("Le niveau d'activité est requis.")
            .isString().withMessage("Le niveau d'activité doit être un texte.")
            .custom(niveau => niveauActivites.includes(niveau))
            .withMessage("Veuillez choisir un niveau d'activité parmi les options proposées : " + niveauActivites.join(", ")),

        body("objectif")
            .notEmpty().withMessage("L'objectif est requis.")
            .isString().withMessage("L'objectif doit être un texte.")
            .custom(objectif => objectifsDisponibles.includes(objectif))
            .withMessage("Veuillez choisir un objectif parmi les options proposées : " + objectifsDisponibles.join(", ")),

        body("pathologies")
            .optional()
            .isArray().withMessage("Veuillez fournir une liste de pathologies.")
            .custom(arr => arr.every(item => typeof item === 'string'))
            .withMessage("Toutes les pathologies doivent être du texte (ex. : 'diabète', 'hypertension').")
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
        const error = new Error("Erreur de validation");
        error.status = httpStatusCodes.UNPROCESSABLE_ENTITY;
        error.details = extractedErrors;
        return next(error);
    }
    next();
}


module.exports = Validate;