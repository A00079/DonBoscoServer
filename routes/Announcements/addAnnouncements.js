const router = require('express').Router();
var FCM = require('fcm-node');
var serverKey = 'AAAAF7Tbebo:APA91bH1yUUjVHbksPOqbVBa4qaKsrSBowe1bB5X2JrNZoRk76c4ZtG6raJ1AP8CAtpKI9n-B8Roha4berIRm8vPPYGB08u_P_pBHpXEb8kmhZG1z_qJ6zWdZ5tb9bFahjUM2iVyQbAB'; 
var fcm = new FCM(serverKey);
// << db setup >>
const db = require("../../db/db.config");
const NotiDB = require("../../db/dbNotification");
const dbName = "DonBosco";
const collectionName = "Announcement";
const collectionSubscriber = "Subscribers";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.post("/", (req, response) => {
        const item = req.body;
        console.log('item', item)

        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            // dbCollection.find().toArray((_error, _result) => { // callback of find
            //     if (_error) throw _error;
            //     response.json(_result);
            // });
            NotiDB.Notificationinitialize(dbName, collectionSubscriber, function (secdbCollection){
                secdbCollection.find().toArray((_error, _result) => { // callback of find
                    if (_error) throw _error;
                    let tokenArry = [];
                    _result.map((item) =>{
                        tokenArry.push(item.token);
                    })
                    response.json(tokenArry);
                    var message = { 
                        registration_ids: tokenArry, 
                        collapse_key: '1',
                        notification: {
                            title: 'Welcome Sir, JARVIS Here.', 
                            body: 'How can i help you.' ,
                            image: 'https://i.picsum.photos/id/1016/3844/2563.jpg'
                        }
                    };
                    fcm.send(message, function(err, res){
                        if (err) {
                            console.log("Something has gone wrong!");
                            // response.sendStatus(404);
                        } else {
                            console.log("Successfully sent with response: ", response);
                            // response.sendStatus(200);
                        }
                    });

                });
            })
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
