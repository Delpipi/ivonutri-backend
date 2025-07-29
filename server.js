/****************************
*** Requirement resources ***
*****************************/
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');

const session = require('express-session');
const passport = require('passport');
const passeportSetup = require('./utilities/passport-setup');

require('dotenv').config();



/****************************
******** Middleware  ********
*****************************/
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'] }))
    .use(cors({ origin: '*' }))
    .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000 // valid 1 hour
        }
    }))
    .use(passport.initialize())
    .use(passport.session())
   
    
    
/****************************
******** Routes  ************
*****************************/
app.use('/', require('./routes'));




/* *******************************
* Express Error Handler
* Place after all other middleware
**********************************/
app.use(async (err, req, res, next) => {
    console.error(`Error: "${err.status}": ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Insernal Server error',
        details: err.details || []
    });
});



/****************************
***** Connect to mongodb ****
*****************************/
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Connected to database !!');
    }).catch((err) => {
        console.log('Cannot Connected to database');
        process.exit();
    })



/****************************
************** ENV **********
*****************************/
const PORT = process.env.PORT || 3001

/****************************
***** Listen on port 3001 ***
*****************************/
app.listen(PORT, () => {
    console.log(`... Server is running on port ${PORT}`);
});