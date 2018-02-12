//REQUEST PACKAGE
var request = require("request");

//FILE SYSTEM PACKAGE
var fs = require("fs");

//TWITTER GLOBAL VARIABLES
var twitter = require('twitter');
var accessKeys = require("./keys.js");
var twitterClient = new twitter(accessKeys.twitterKeys);

//SPOTIFY GLOBAL VARIABLES
var http = require("http");
var spotify = require('node-spotify-api');
// console.log(spotify);
// var spotifyClient = spotify(accessKeys.spotifyKeys);
var spotifyKeys = new spotify({
	id: '1e6fbe5d3ba14b7b9f5665b2ee8ef2bc',
	secret: '6626b709709645ac8a527980c7510284'
});

//OMDB GLOBAL VARIABLES
var movie = "";
var movieArray = [];

//TERMINAL GLOBAL VARIABLES
var nodeArray = process.argv;
var pullRequest = process.argv[2];

switch (pullRequest) {
	
	case "movie-this": 
		getMovie();
		break;
	case "my-tweets":	
		getTweet();
		break;
	case "spotify-this-song":
		getSpotify();
		break;
}//Switch closing brace

function getTitle() {
	for (var i = 3; i < nodeArray.length; i++) {

				var titleSelection = nodeArray[i];
				titleArray.push(movieSelection);
				var title = movieArray.toString();
			}	
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
function getMovie() {	
    if (nodeArray.length === 3) {
    	var title = "Mr. Nobody";
    }
    else {
    	getTitle();
	}

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	    // If the request is successful (i.e. if the response status code is 200)
	    if (!error && response.statusCode === 200) {
        // console.log(JSON.parse(body));
        console.log("Movie title: " + JSON.parse(body).Title);
        console.log("Year of release: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
		}//if statement closing brace
	});//request closing bracket
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Used initially to create 20 tweets
// var botPostCount = 0;
// for (var i = 1; i < 18; i++) {
// 	var botPostCount = i;		
// 	twitterClient.post('statuses/update', {status: 'My tweet bot # ' + botPostCount}, function(error, tweet, response) {
// 		console.log(tweet[i].text);
// 	});
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTweet() {
	twitterClient.get('statuses/user_timeline', function(error, tweets, response) {
		if(!error) {
			// console.log(tweets);
			for (var i = 0; i < 20; i++) {	
				console.log(tweets[i].text);
			}
		}
	});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSpotify() {
	
	spotifyKeys.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
		if (err) {
		return console.log('Error occurred: ' + err);
		}
		console.log(data.tracks);
	});
}