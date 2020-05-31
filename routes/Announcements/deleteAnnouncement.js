const router = require('express').Router();

// << db setup >>
const db = require("../../db/db.config");
const dbName = "DonBosco";
const collectionName = "Announcement";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    router.delete('/',(req, res) => {
        Exercise.findByIdAndDelete(req.body.id)
          .then(() => res.json('Announcement deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
      });
}, function (err) { // failureCallback
    throw (err);
});

module.exports = router;
