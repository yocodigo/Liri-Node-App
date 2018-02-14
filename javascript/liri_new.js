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
var spotifyClient = new spotify(accessKeys.spotifyKeys);

//OMDB GLOBAL VARIABLES
var title = "";
var titleArray = [];

//TERMINAL GLOBAL VARIABLES
var nodeArray = process.argv;
var requestType = nodeArray[2];


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
switch (requestType) {
	case "movie-this": 
		getMovie();
		break;
	case "my-tweets":	
		getTweet();
		break;
	case "spotify-this-song":
		// getTitle();
		getSpotify(word)
		break;
	case "do-what-it-says":

		break;
}//Switch closing brace
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
function getMovie() {	
	console.log(nodeArray.length);
	if (nodeArray.length === 3) {

		var movie = "Mr.+Right";
		// Then run a request to the OMDB API with the title specified
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	
		    // If the request is successful (i.e. if the response status code is 200)
		    if (!error && response.statusCode === 200) {
		        console.log(JSON.parse(body).Title);
		        console.log("Year of release: " + JSON.parse(body).Year);
		        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		        console.log("Produced in: " + JSON.parse(body).Country);
		        console.log("Language: " + JSON.parse(body).Language);
		        console.log("Plot: " + JSON.parse(body).Plot);
		        console.log("Actors: " + JSON.parse(body).Actors);
			}//if statement closing brace
		});
	}	
	else {
		var getTitle;
		for (var i = 3; i < nodeArray.length; i++) {
			var titleSelection = nodeArray[i];
			titleArray.push(titleSelection);
			getTitle = titleArray.toString();
		}
			getTitle.replace(",", " ");

		var movie = getTitle;
		// Then run a request to the OMDB API with the title specified
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	
		    if (!error && response.statusCode === 200) {
		        console.log("Movie title: " + JSON.parse(body).Title);
		        console.log("Year of release: " + JSON.parse(body).Year);
		        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		        console.log("Produced in: " + JSON.parse(body).Country);
		        console.log("Language: " + JSON.parse(body).Language);
		        console.log("Plot: " + JSON.parse(body).Plot);
		        console.log("Actors: " + JSON.parse(body).Actors);
			}//if statement closing brace
		});
	}			
}		
// }//request closing bracket

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
			
			for (var i = 0; i < 20; i++) {	
				console.log(tweets[i].text);
			}
		}
	});
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSpotify(input) {
	
	spotifyClient.search({ type: 'track', query: input }, function(err, data) {	
		
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		
		console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
		console.log("Track Title: " + data.tracks.items[0].name);
		console.log("Preview Track: " + data.tracks.items[0].preview_url);
		console.log("Album Title: " + data.tracks.items[0].album.name);

	});
}