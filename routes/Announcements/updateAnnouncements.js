const router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Announcement";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.post("/", (req, response) => {
        const item = req.body;
        console.log('update', item)

        dbCollection.updateOne({_id:ObjectId(req.body.id)},
        {
            $set: { "Name": req.body.Name, "Title": req.body.Title, "Message": req.body.Message, "Date":req.body.Date }
        }, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
