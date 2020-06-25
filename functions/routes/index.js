const functions = require('firebase-functions');
var firebase = require("firebase/app");

require('firebase/auth');
require('firebase/database');
require("firebase-admin");

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var test;
var myDb = firebase.database();
var password;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/', function (req, res, next) {
    test = req.body.mot_de_passe;
    // console.log(test);

    var passwordRef = myDb.ref('Password');


    passwordRef.on("value", function (snapshot) {
        console.log(snapshot.val());
        password = snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    if (req.body.mot_de_passe == password) {
        res.redirect('/admin');
        //console.log("yes");
    }
    else {
        res.redirect('/');
        // console.log("no");
    }

});


module.exports = router;