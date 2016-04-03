var express = require('express');
var router = express.Router();
var path = require('path');
// Twitter API functionality
var Twitter = require('twitter');
//var env = require('node-env-file');
//env(__dirname + '/../.env');
 
// Use "launchctl setenv process.env.twittertown_consumer_secret [VALUE]" to set env variables on Mac
var twitterClient = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TwitterTown Home' });
});

router.get('/dashboard', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/dashboard.htm'));
});

router.post('/api/twitter/search/tweets', function(req, res, next) {
    var searchTerm = req.body.SearchTerm; 
    var searchParams = { q: searchTerm}; 
    twitterClient.get('search/tweets', searchParams, function(error, tweets, response){
        if (!error) {
            console.log("# Tweets: " + tweets.statuses.length);
            res.json(tweets);
        }
        else 
            res.json(""); 
    });
});

router.get('/api/twitter/search/tweets', function(req, res, next) {
  console.log("Made it to the Twitter API route.");
  res.send("Made it to the Twitter API route.");
});

module.exports = router;