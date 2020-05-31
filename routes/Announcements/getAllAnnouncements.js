const router = require('express').Router();

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Announcement";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.get("/", (req, response) => {
        dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        response.json(result)
        // << return response to client >>
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
