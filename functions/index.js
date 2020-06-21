const functions = require('firebase-functions');

const express = require('express');
var logger = require('morgan');
var path = require('path');

const app = express();
const port = 3000;

var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');


app.listen(port, function () {
    console.log("port: " + port);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(logger('dev'));

app.use('/', indexRouter);

app.use('/admin', adminRouter);

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);

// });