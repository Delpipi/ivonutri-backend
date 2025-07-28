const httpStatusCodes = require('../utilities/http-status-code');
const appError = require('./app-error');

const Util = {};

/*****************************************
 **** Check if user is authenticated *****
 **************************************** */
Util.isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return next(new appError(httpStatusCodes.UNAUTHORIZED, 'You do not have access, Please log in.'));
    }
    next();
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;