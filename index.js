const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const AddAnnouncements = require('./routes/Announcements/addAnnouncements.js');
const GetAnnouncements = require('./routes/Announcements/getAllAnnouncements.js');
const DeleteAnnouncements = require('./routes/Announcements/deleteAnnouncement.js');
const UpdateAnnouncements = require('./routes/Announcements/updateAnnouncements.js');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Middlewares
app.use(cors());
// Routes
app.use('/api/admin/announcement/create', AddAnnouncements);
app.use('/api/admin/announcement/update', UpdateAnnouncements);
app.use('/api/admin/announcement/read', GetAnnouncements);
app.use('/api/admin/announcement/delete', DeleteAnnouncements);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'build')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});