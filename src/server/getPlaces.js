const express = require("express");
const router = express.Router();
require('dotenv').config();

const Client = require('@googlemaps/google-maps-services-js').Client;
const client = new Client({});

// gets request query from the users and sends back the first response. 
router.get("/:query", (req, res) => {
    client
    .findPlaceFromText({
      params: {
        key: process.env.MAPS_API,
        input: req.params.query,
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
          res.send(r.data)
        })
        .catch(err => {
          console.log(err);
          res.send(false);  
        })  
      })
      .catch(e => {
        console.log(e);
        res.send(false);
      });
});

module.exports = router;