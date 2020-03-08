const express = require("express");
const router = express.Router();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

// preconditions: 
//  body: needs req.body.reviews => array of objects
router.post("/", async (req, res) => {
  
  let reviewArray = req.body.reviews;

  for(let i = 0; i < reviewArray.length; i++){

    // The text to analyze
    const text = reviewArray[i].text;
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    // console.log(`Text: ${text}`);
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    reviewArray[i].sentimentScore = sentiment.score;
    reviewArray[i].sentimentMagnitude = sentiment.magnitude;
  }
  res.send(reviewArray);
})

module.exports = router;