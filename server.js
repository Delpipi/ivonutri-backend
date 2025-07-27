/****************************
*** Requirement resources ***
*****************************/
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database');

require('dotenv').config();



/****************************
******** Middleware  ********
*****************************/
app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));



    
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
        statusCode: err.status,
        message: err.message || 'Insernal Server error'
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