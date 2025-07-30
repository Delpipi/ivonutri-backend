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

const isProduction = process.env.NODE_ENV === 'production';

/****************************
******** Middleware  ********
*****************************/

//CORS Config
const corsOptions = {
    origin: isProduction
        ? ['https://ivonutri-backend.onrender.com']
        : ['http://localhost:3001'],
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Z-Key']
};

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors(corsOptions))
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        name: 'sessionId',
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
        message: err.message || 'Internal Server error',
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