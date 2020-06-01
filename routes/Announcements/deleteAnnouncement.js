const router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Announcement";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.delete('/',(req, res) => {
        console.log('delete id',req.body.id)
        dbCollection.deleteOne({_id:ObjectId(req.body.id)})
          .then(() => res.json('Announcement deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
      });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
