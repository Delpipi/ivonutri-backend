const routes = require('express').Router();
const utilities = require('../utilities/');
const validate = require('../utilities/user-validation');
const userController = require('../controllers/user-controller');

// Add routes

routes.get('/',
    /* #swagger.tags = ['Users'] */
    utilities.handleErrors(userController.getAllUsers)
);

routes.get('/:id',
    /* #swagger.tags = ['Users'] */
    validate.userIdRules(),
    validate.checkRules,
    utilities.handleErrors(userController.getUserById),
);
routes.post('/',
    /* #swagger.tags = ['Users'] */
    validate.userRules(),
    validate.checkRules,
    utilities.handleErrors(userController.createUser),
);
routes.put('/:id',
    /* #swagger.tags = ['Users'] */
    validate.userIdRules(),
    validate.userRules(),
    validate.checkRules,
    utilities.handleErrors(userController.updateUser),
);

routes.delete('/:id',
    /* #swagger.tags = ['Users'] */
    validate.userIdRules(),
    validate.checkRules,
    utilities.handleErrors(userController.deleteUserById),
);

module.exports = routes;
