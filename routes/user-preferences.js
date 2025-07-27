const routes = require('express').Router();
const utilities = require('../utilities/');
const validate = require('../utilities/user-preferences-validation');
const prefController = require('../controllers/user-preferences-controller');

// Add routes

routes.get('/',
    /* #swagger.tags = ['Préférences utilisateur'] */
    utilities.handleErrors(prefController.getAllUserPreferences)
);
routes.get('/:id',
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.IdRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.getUserPreferenceById)
);
routes.get('/user/:id',
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.IdRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.getUserPreferenceByUserId)
);
routes.post('/',
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.userPreferencesRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.createUserPreference)
);
routes.put('/:id',
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.IdRules(),
    validate.userPreferencesRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.updateUserPreferenceById)
);
routes.put('/user/:id',
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.IdRules(),
    validate.userPreferencesRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.updateUserPreferenceByUserId)
);

routes.delete('/:id', 
    /* #swagger.tags = ['Préférences utilisateur'] */
    validate.IdRules(),
    validate.checkRules,
    utilities.handleErrors(prefController.deleteUserPreferenceById)
);

module.exports = routes;