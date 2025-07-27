const { param, body, validationResult } = require('express-validator');
const httpStatusCodes = require('./http-status-code');
const Validate = {};

const regimesAutorises = [
  "omnivore",
  "végétarien",
  "végétalien",
  "halal",
  "casher",
  "sans gluten",
  "sans lactose",
  "paléo",
  "keto",
  "diabétique"
];


/****************************
***** VALIDATION RULES  *****
*****************************/
Validate.IdRules = () => {
    //Valid user id required
    return [
        param("id")
            .trim()
            .notEmpty().withMessage("L'identifiant du profil / utilisateur est requis")
            .isMongoId().withMessage("L'identifiant du profil / utilisateur est invalide")
    ]
}

Validate.userPreferencesRules = () => {
    //Valid contact id required
    return [
        body("userId")
            .trim()
            .notEmpty().withMessage("L'identifiant de l'utilisateur est requis.")
            .isMongoId().withMessage("L'identifiant de l'utilisateur est invalide."),
            
        body("alimentsAimes")
            .optional()
            .isArray().withMessage("Veuillez fournir une liste d'aliments que vous aimez.")
            .custom((items) => items.every(item => typeof item == 'string'))
            .withMessage("Chaque aliment dans la liste doit être un texte (ex. : 'pomme', 'pizza')."),
        
         body("alimentsEvites")
            .optional()
            .isArray().withMessage("Veuillez fournir une liste d'aliments à éviter.")
            .custom((items) => items.every(item => typeof item == 'string'))
            .withMessage("Tous les aliments à éviter doivent être du texte (ex. : 'lait', 'gluten')."),
        
        body("allergies")
            .optional()
            .isArray().withMessage("Veuillez fournir une liste d'allergies.")
            .custom((items) => items.every(item => typeof item == 'string'))
            .withMessage("Les allergies doivent être du texte (ex. : 'arachide')."),
        
        body("regimes")
            .optional()
            .isArray().withMessage("Veuillez fournir une liste de regimes.")
            .custom((items) => items.every(item => regimesAutorises.includes(item)))
            .withMessage("Un ou plusieurs régimes ne sont pas reconnus. Veuillez choisir parmi : " + regimesAutorises.join(", ")),
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