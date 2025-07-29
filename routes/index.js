const routes = require('express').Router();

routes.get('/', (req, res) => res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.nom}` : 'Logged Out'));

routes.use('/auth', require('./auth'));
routes.use('/users', require('./users'));
routes.use('/profil-nutritionnels', require('./profil-nutritionnels'));
routes.use('/user-preferences', require('./user-preferences'));

//API DOC
routes.use('/api-docs', require('./swagger'));

module.exports = routes;