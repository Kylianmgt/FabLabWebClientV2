var firebase = require("firebase/app");
const functions = require('firebase-functions');

require('firebase/auth');
require('firebase/database');

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var myDb = firebase.database();
const dbref = myDb.ref('Request');



function getRequest() {

    return dbref.once('value').then(snap => snap.val());
}

/* GET home page. */
router.get('/', function (req, res, next) {

    functions.config().firebase
    //console.log("issou");
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
    var updates = {};
    updates['/status/'] = "traité";

    dbref.child(idToDelete).update(updates);
    getRequest().then(
        request => {
            res.render('admin', {
                request
            });
        })
});





module.exports = router;