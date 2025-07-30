const routes= require('express').Router();
const passport = require('passport');
const httpStatusCode = require('../utilities/http-status-code')

routes.get('/login', () => {
    console.log('Login');
});

// auth with google
routes.get('/google', passport.authenticate('google', {
    scope: ['profile','email']
}));

routes.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

//callback route for google to redirect to
routes.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/api-docs' }), (req, res) => {
    if (req.user) {
        req.session.user = req.user;
        res.redirect('/');
    } else {
        console.error('No user found after authentication');
    }
});

module.exports = routes;