const express = require('express');
const os = require('os');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// middleware
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

// routes
app.use('/api/getPlaces', require("./getPlaces.js"));

//init server port - 8080
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));