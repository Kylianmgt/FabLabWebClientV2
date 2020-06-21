var firebase = require("firebase/app");
const functions = require('firebase-functions');

require('firebase/auth');
require('firebase/database');

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
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



const firebaseApp = firebase.initializeApp(config);






function getRequest() {
    var myDb = firebase.database();
    const dbref = myDb.ref('Request');
    return dbref.once('value').then(snap => snap.val());
}

/* GET home page. */
router.get('/', function (req, res, next) {

    functions.config().firebase
    console.log("issou");
    //console.log(getRequest());
    getRequest().then(
        request => {
            res.render('admin', {
                request
            });
        })
    // res.render('admin');
});




router.post('/', function (req, res, next) {
    var idToDelete = req.body.idToDelete;
    console.log(idToDelete);
});





module.exports = router;