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



    function displayMessage(snapshot, res, uId, msgs) {
        //message displayer triggeres each time a msg is added in the Database
        console.log("nouevhdzuiedhziruf");
        io.emit('new-msg', msgs);

    }

    function sendMessage(msgText, uId) {
        //Send msg from Elea,     
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
        //if a message is typed , send the message to the db and then display it

        uId = req.body.userId;
        var msgs = [];
        var ref = myDb.ref('Contact').child(uId);
        res.render('contact', {
            uId
        });

        if (req.body.msg) {
            sendMessage(req.body.msg, uId);
        }

        io.on('connection', (socket) => {

            ref.on("child_added", function (snapshot, prevChildKey) {
                //res.redirect("/");
                //console.log(snapshot.val());
                msgs.push(snapshot.val());
                console.log(msgs);
                displayMessage(snapshot, res, uId, msgs);
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