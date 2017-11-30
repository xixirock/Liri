// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var keys = require('../key.js');

// Set up all necessary variables for the code to propperly run
var fs = require('fs');
var spotify = require('spotify');
var twitter = require('twitter');
var request = require('request');


// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says
// What Each Command Should Do
// set up switch for all the different command for users


var liriArgv = process.argv[2];

switch(liriArgv) {
  case "my-tweets": myTweets(); break;
  case "spotify-this-song": spotifyThisSong(); break;
  case "movie-this": movieThis(); break;
  case "do-what-it-says": doWhatItSays(); break;

//show default instruction to users

default: console.log("\r\n" + "type any of the following line right after 'node liri.js' : " + "\r\n" +
          "1.my-tweets 'any twitter name'" + "\r\n" +
          "2.spotify-this-song 'any song name'" + "\r\n" +
          "3.movie-this 'any movie name'" + "\r\n" +
          "4.do-what-it-says" + "\r\n" +
          "Make sure to put the movie and songs name in quotation mark if it's more than one word!"
)
};



// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
  var user = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
  });
  // set user input of twitter username into second part of the argument
  var twitterUsername = process.argv[3];
  // default set to my twitter feed if no twitter username is given  
  if (!twitterUsername){
    twitterUsername = 'xixirock77';
  }

  params = {screen_name: twitterUsername, count: 20 };

  user.get("statuses/user_timeline/",  params, function(error, data, response){
    if(!error){
      for(var i = 0; i < data.length; i++){
        console.log(response); //testing response if appear
        var twitterResult = 
        "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(twitterResults);        
      }
    }else{
      console.log("Error: " + error);
      return;
    }
  })


}




// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
function spotifyThisSong() {
  var songName = process.argv[3];
  if(!songName){
    songName = "Through the fire and flames";
  }

  params = songName;

  spotify.search({type: "track", query: params}, function(error, data){
    if(!error){
      var songInfo = data.track.items;
      for(var i = 0; i < 3; i++){
        if (songInfo[i] != undefined){
          var spotifyResult =
          "Artist: " + songInfo[i].artists[0].name + "\r\n" +
          "Song: " + songInfo[i].name + "\r\n" +
          "Album the song is from: " + songInfo[i].album.name + "\r\n" +
          "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
          "------------------------------ " + i + " ------------------------------" + "\r\n";
          console.log(spotifyResults);
          }else{
          console.log("Error: " + error);
          return;
        }
      }
    }
  });

};



// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
// Step One: Visit https://developer.spotify.com/my-applications/#!/
// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package. See the
// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieThis() {
  var movie = process.argv[3];
  if(!movie){
    movie = "mr nobody";
  }
  params = movie
  request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieObject = JSON.parse(body);
      var movieResult = 
      "Title: " + movieObject.Title+"\r\n"+
      "Year: " + movieObject.Year+"\r\n"+
      "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
      "Country: " + movieObject.Country+"\r\n"+
      "Language: " + movieObject.Language+"\r\n"+
      "Plot: " + movieObject.Plot+"\r\n"+
      "Actors: " + movieObject.Actors+"\r\n"+
      "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
      "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n";

}
});
}


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (!error) {
      doWhatItSaysResults = data.split(",");
      spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
    } else {
      console.log("Error occurred" + error);
    }
  });
};