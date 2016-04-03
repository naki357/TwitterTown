var express = require('express');
var router = express.Router();
var path = require('path');
// Twitter API functionality
var Twitter = require('twitter');
var env = require("../env.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TwitterTown Home' });
});

router.get('/dashboard', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/dashboard.htm'));
});
 
router.post('/api/twitter/search/tweets', function(req, res, next) {
    // Use "launchctl setenv process.env.twittertown_consumer_secret [VALUE]" to set env variables on Mac
    var twitterClient = new Twitter({
        consumer_key: env.getConsumerKey(),
        consumer_secret: env.getConsumerSecret(),
        access_token_key: env.getAccessTokenKey(),
        access_token_secret: env.getAccessTokenSecret()
    });
    
    var searchTerm = req.body.SearchTerm; 
    var searchParams = { q: searchTerm};  
    twitterClient.get('search/tweets', searchParams, function(error, tweets, response){
        if (!error) {
            res.json(tweets);
        }
        else 
            res.json(""); 
    });
});

module.exports = router;