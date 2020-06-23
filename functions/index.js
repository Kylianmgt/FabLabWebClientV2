const functions = require('firebase-functions');

const express = require('express');
var logger = require('morgan');
var path = require('path');
var firebase = require("firebase/app");

const app = express();
const port = 3000;

var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var contactRouter = require('./routes/contact');

const config = {
    apiKey: "AIzaSyDZUUGP2FM_svmEB2CQZjN7NjSEO4MQyrU",
    authDomain: "fablab-19.firebaseapp.com",
    databaseURL: "https://fablab-19.firebaseio.com",
    projectId: "fablab-19",
    storageBucket: "fablab-19.appspot.com",
    messagingSenderId: "892898999133",
    appId: "1:892898999133:web:8f7cff985ec34eed1506b4",
    measurementId: "G-4HQWP3RP7X"
};

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
app.use('/contact', contactRouter);


app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);

// });