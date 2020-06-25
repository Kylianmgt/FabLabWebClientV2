var firebase = require("firebase/app");
const functions = require('firebase-functions');

require('firebase/auth');
require('firebase/database');
require("firebase-admin");

var express = require('express');
var bodyParser = require('body-parser');



module.exports = function (io) {
    var eleaEmail = "lol@lol.fr";
    var router = express.Router();
    var uId;

    var myDb = firebase.database();



    function displayMessage(snapshot) {
        console.log("je vais la");
        io.emit('new-msg', snapshot);
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
        var msgs = [];
        var ref = myDb.ref('Contact').child(uId);


        if (req.body.msg) {
            sendMessage(req.body.msg, uId);
        }
        res.render('contact', {
            uId
        });
        io.on('connection', (socket) => {
            console.log("je ete bz");
            ref.on("child_added", function (snapshot, prevChildKey) {
                //res.redirect("/");
                msgs.push(snapshot.val());
                displayMessage(snapshot);
                //console.log(msgs);
                //displayMessage(msgs);
                //displayMessage(res, snapshot);
            });
        });

        // displayMessage(uId).then(message => {
        //     res.render('contact', {
        //         message,
        //         uId
        //     });
        // })

    });

    return router;
};