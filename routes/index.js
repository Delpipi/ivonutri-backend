const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/profil-nutritionnels', require('./profil-nutritionnels'));
routes.use('/user-preferences', require('./user-preferences'));

//API DOC
routes.use('/api-docs', require('./swagger'));

module.exports = routes;