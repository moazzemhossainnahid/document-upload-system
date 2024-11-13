const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();



app.use(cors());
app.use(express.json());


app.use('/public', express.static('public'))

// import routes
const imagesRoute = require('./v1/Routes/images.route');
const videosRoute = require('./v1/Routes/videos.route');
const dbConnect = require("./Utilities/dbConnect");




// declare routes
app.use('/api/v1/images', imagesRoute);
app.use('/api/v1/videos', videosRoute);



dbConnect();


app.get("/", (req, res) => {
    try {
        res.send("Welcome to Media Storage Server !");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});



// Serve static files including uploaded videos & images
app.use('/images', express.static(path.join(__dirname, 'media', 'images')));
app.use('/videos', express.static(path.join(__dirname, 'media', 'videos')));


app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});
