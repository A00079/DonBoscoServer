const router = require('express').Router();

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

                });
            })
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
