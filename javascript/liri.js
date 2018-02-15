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
//This will run a function depending on what the switch case enters in argv[2]	
switch (requestType) {
	case "movie-this": 
		var movie = "Mr. Right";
		getMovie(movie);
		outputText();
		break;
	case "my-tweets":	
		getTweet();
		outputText();
		break;
	case "spotify-this-song":
		var song = "The Sign";
		getSpotify(song);
		outputText();
		break;
	case "do-what-it-says":
		getRandom();
		outputText();
		break;
}//Switch closing brace
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Make an API call to OMDB
function getMovie(defaultMovie, movie) {	
	console.log(nodeArray.length);
	if (nodeArray.length === 3) {

		//If the user didn't enter a movie, insert the default movie in the URL request
		request("http://www.omdbapi.com/?t=" + defaultMovie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	
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
		//Go through the array from 3rd argument on to get the full movie title name
		for (var i = 3; i < nodeArray.length; i++) {
			var titleSelection = nodeArray[i];
			titleArray.push(titleSelection);
			getTitle = titleArray.toString();
		}
			getTitle.replace(",", " ");

		var movie = getTitle;

		//Insert the name of the movie the user entered into the URL request
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
//Make an API call to Twitter and return the last 20 tweets
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
//If the user enters the spotify-this-song operator, the switch will run this function
function getSpotify(defaultSong) {
	if (nodeArray.length === 3) {

		spotifyClient.search({ type: 'track', query: defaultSong, limit: 10 }, function(err, data) {	
			
			console.log("---------------------------");
			console.log("---------------------------");
			console.log("---------------------------");
			
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			if (song === "The Sign") {
			
				console.log("Artist: " + data.tracks.items[5].artists[0].name);
				console.log("Track Title: " + data.tracks.items[5].name);
				console.log("Preview Track: " + data.tracks.items[5].preview_url);
				console.log("Album Title: " + data.tracks.items[5].album.name);
			}
			else {
				console.log("Artist: " + data.tracks.items[0].artists[0].name);
				console.log("Track Title: " + data.tracks.items[0].name);
				console.log("Preview Track: " + data.tracks.items[0].preview_url);
				console.log("Album Title: " + data.tracks.items[0].album.name);	
			}
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

		var songSelection = getTitle;

		spotifyClient.search({ type: 'track', query: songSelection, limit: 5 }, function(err, data) {	
			
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
//If the user enters the do-what-it-says operator, it will run this function.
function getRandom() {
	fs.readFile("random.txt", "utf8", function(error, data) {

	    if (error) {
	        return console.log(error);
	    }

	    // Then split it by commas (to make it more readable)
	    var dataArr = data.split(",");

	    if (dataArr[0] === "spotify-this-song") {
	    	var song = dataArr[1]
	    	getSpotify(song);
	    }
	    else if (dataArr[0] === "movie-this") {
	    	var movie = dataArr[1]
	    	getMovie(movie);
	    }

	});
}

function outputText(movie) {
	var log ="log.txt";
	var movie = getMovie(movie);
	// fs.writeFile(log, nodeArray, function(err){
	//   if(err)
	//     console.error(err);
	//     console.log('Written!');
	// });

	fs.appendFile(log, nodeArray[2] + " " + nodeArray[3] + '\n',function(err){
	  if(err)
	    console.error(err);
	    console.log('Appended!');
	});
}