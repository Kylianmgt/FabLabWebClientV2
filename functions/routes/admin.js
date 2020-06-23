const functions = require('firebase-functions');

require('firebase/auth');
require('firebase/database');

var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();





function getRequest() {
    var myDb = firebase.database();
    const dbref = myDb.ref('Request');
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
    console.log(idToDelete);
});





module.exports = router;