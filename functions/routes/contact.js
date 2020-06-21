var firebase = require("firebase/app");
const functions = require('firebase-functions');

require('firebase/auth');
require('firebase/database');
require("firebase-admin");


var express = require('express');
var bodyParser = require('body-parser');
var eleaEmail = "lol@lol.fr";

var router = express.Router();
var uId;
var myDb = firebase.database();



function displayMessage(uId) {

    var dbref = myDb.ref('Contact').child(uId);
    return dbref.once('value').then(snap => snap.val());
}

function sendMessage(msgText, uId) {
    // var dbref2 = myDb.ref('Contact').child(uId);
    var msg = {
        messageText: msgText,
        messageTime: Date.now(),
        userEmail: eleaEmail,
        userName: "Eleeeeaaaaaa",
        uId: uId


    }
    var newPostKey = firebase.database().ref('Contact').child(uId).push().key;
    var updates = {};
    updates[newPostKey] = msg;


    return firebase.database().ref('Contact').child(uId).update(updates);


}


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contact');

});
router.post('/', function (req, res, next) {

    uId = req.body.userId;

    console.log(uId);

    var ref = myDb.ref('Contact').child(uId);
    ref.on("child_added", function (snapshot, prevChildKey) {
        // displayMessage(uId).then(message => {
        //     res.render('contact', {
        //         message,
        //         uId
        //     });
        console.log("new");
        //res.redirect(request.post('referer'));

        // })


    });


    if (req.body.msg) {
        sendMessage(req.body.msg, uId);
    }
    displayMessage(uId).then(message => {
        res.render('contact', {
            message,
            uId
        });



    })

});







module.exports = router;