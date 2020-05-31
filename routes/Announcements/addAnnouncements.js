const router = require('express').Router();

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Announcement";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.post("/", (req, response) => {
        const item = req.body;
        console.log('item', item)

        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
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
