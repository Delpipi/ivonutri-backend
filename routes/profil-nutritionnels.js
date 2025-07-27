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
    /* #swagger.tags = ['Profils nutritionnels'] 
        #swagger.description = 'Créer un profil'
        #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Nutritionnels' }
        }
    */
    validate.profilNutritionnelsRules(),
    validate.checkRules,
    utilities.handleErrors(profilController.createProfilNutritionnel)
);
routes.put('/:id',
     /* #swagger.tags = ['Profils nutritionnels'] 
        #swagger.description = 'Modifier un profil'
        #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Nutritionnels' }
        }
    */
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