const routes = require('express').Router();
const utilities = require('../utilities/');
const validate = require('../utilities/profil-nutritionnels-validation');
const profilController = require('../controllers/profil-nutritionnels-controller');

// Add routes

routes.get('/',
    /* #swagger.tags = ['Profils nutritionnels'] */
    utilities.handleErrors(profilController.getAllProfilNutritionnels)
);
routes.get('/:id',
    /* #swagger.tags = ['Profils nutritionnels'] */
    validate.IdRules(),
    validate.checkRules,
    utilities.handleErrors(profilController.getProfilNutritionnelById)
);
routes.post('/', 
    /* #swagger.tags = ['Profils nutritionnels'] */
    validate.profilNutritionnelsRules(),
    validate.checkRules,
    utilities.handleErrors(profilController.createProfilNutritionnel)
);
routes.put('/:id',
    /* #swagger.tags = ['Profils nutritionnels'] */
    validate.IdRules(),
    validate.profilNutritionnelsRules(),
    validate.checkRules,
    utilities.handleErrors(profilController.updateProfilNutritionnel)
);
routes.delete('/:id',
    /* #swagger.tags = ['Profils nutritionnels'] */
    validate.IdRules(),
    validate.checkRules,
    utilities.handleErrors(profilController.deleteProfilNutritionnelById)
);

module.exports = routes;