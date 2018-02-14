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
var song = "The+Sign";

//OMDB GLOBAL VARIABLES
var title = "";
var titleArray = [];

//TERMINAL GLOBAL VARIABLES
var nodeArray = process.argv;
var requestType = nodeArray[2];

getRandom();

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
		getSpotify(song);
		break;
	case "do-what-it-says":
		getRandom();
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
function getSpotify(song) {
	if (nodeArray.length === 3) {
		
		// var song = "The+Sign";

		spotifyClient.search({ type: 'track', query: song, limit: 5 }, function(err, data) {	
		
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			
			console.log("Artist: " + data.tracks.items[5].artists[0].name);
			console.log("Track Title: " + data.tracks.items[5].name);
			console.log("Preview Track: " + data.tracks.items[5].preview_url);
			console.log("Album Title: " + data.tracks.items[5].album.name);

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

		var song = getTitle;

		spotifyClient.search({ type: 'track', query: song, limit: 5 }, function(err, data) {	
			
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			
			console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
			console.log("Track Title: " + data.tracks.items[0].name);
			console.log("Preview Track: " + data.tracks.items[0].preview_url);
			console.log("Album Title: " + data.tracks.items[0].album.name);

		});
	}	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandom() {
	fs.readFile("random.txt", "utf8", function(error, data) {

	    
	    if (error) {
	        return console.log(error);
	    }

	    // We will then print the contents of data
	    // console.log(data);

	    // Then split it by commas (to make it more readable)
	    var dataArr = data.split(",");

	    // We will then re-display the content as an array for later use.
	    // console.log(dataArr);
	    if (dataArr[0] === "spotify-this-song") {
	    	var song = dataArr[1]
	    	getSpotify(song);
	    }
	    return requestType = dataArr[0]

	});
}

	