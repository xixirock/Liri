var Twitter = require('twitter');

var client = new Twitter({
 consumer_key: '',
 consumer_secret: '',
 access_token_key: '',
 access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
   console.log(tweets);
 }
});

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});