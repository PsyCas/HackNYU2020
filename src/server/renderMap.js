const express = require("express");
const router = express.Router();
require('dotenv').config();

const Client = require('@googlemaps/google-maps-services-js').Client;
const client = new Client({});

router.get("/", (req, res) => {
    
    client
    .findPlaceFromText({
      params: {
        key: process.env.MAPS_API,
        input: "Times Square, New York",
        inputtype: "textquery"
      },
        timeout: 1000 // milliseconds
      })
      .then(r => {
        console.log(r.data);
        console.log(r.data.candidates[0].place_id);

        client.placeDetails({
          params: {
            key: process.env.MAPS_API,
            place_id: r.data.candidates[0].place_id
          }
        })
        .then((r) => {
          console.log(r.data);
          res.send("<h1>did it!</h1>")
        })
        .catch(err => {
          console.log(err);
          res.send("<h1>BIg fail!</h1>")
        })  
      })
      .catch(e => {
        console.log(e);
        
        res.send("<h1>BIg fail!</h1>")
      });
});

module.exports = router;