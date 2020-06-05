const router = require('express').Router();

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Subscribers";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.post("/", (req, response) => {
        const item = req.body;
        console.log('item', item)
        dbCollection.findOne({ token: req.body.token }, function(err, user) {
            if(err) {
               //handle error here
            }
            //if a user was found, that means the user's email matches the entered email
            if (user) {
                  var err = new Error('A user with that token has already registered...')
                 err.status = 400;
                 response.json(err);
            } else {
                //code if no user with entered email was found
                dbCollection.insertOne(item, (error, result) => { // callback of insertOne
                    if (error) throw error;
                    // return updated list
                    dbCollection.find().toArray((_error, _result) => { // callback of find
                        if (_error) throw _error;
                        response.json(_result);
                    });
                });
            }
         }); 
    });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
