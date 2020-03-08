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
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/', require("./renderMap.js"));


//init server port - 8080
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));