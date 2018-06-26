# Language Interpretation and Recognition Interface(LIRI)
LIRI is a command line node app that allows the user to retrieve data from Spotify, Twitter, and OMDB.

## Purpose
No longer do you have to open your browser or multiple apps to get the raw data from your favorite entertainment and social media sites. LIRI is an example of that. All you need is one terminal window, a couple of action commands and armed with a list of song or movie titles.

## Technologies Used
* Bash (But you can use a terminal of your choice when running the app)
* Node JS
* NPM

## Node Packages Used
* Twitter
* Spotify

## Requirements
* A Twitter account with at least one tweet.
  * Obtain Twitter keys. Fill in the required fields and follow instructions here to obtain the necessary keys and tokens here: https://apps.twitter.com/app/new. Note the key and tokens as you will need to use them to connect to Twitter. 
* You need to have a Spotify account.
  * You will also need to obtain an ID and secret from Spotify. You can do so by following the instructions here: 
     https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app. You will also need to note the ID and 
     secret to connect to your Spotify account when using this app.

## Instructions
1. Go to https://github.com/yocodigo/Liri-Node-App.
2. Clone/Download the repository locally. Note the directory of the clone.
3. Open your terminal and change the directory(cd) to the local instance of the app--i.e. (local)\liri-node-app.
4. Enter 'npm install' in your terminal. The node_modules should have been created in the current directory, (local)\liri-node-app,   
   after running this command.
5. Go into (local)\liri-node-app\config and create a keys.js file in that directory.
6. Add the following code:
   
   var twitterKeys = {
   consumer_key: '(key here)',
   consumer_secret: '(secret here)',
   access_token_key: '(token key here)',
   access_token_secret: '(token secret here)',
   }

   var spotifyKeys = {
    id: '(id here)',
    secret: '(secret here)',
   };

   module.exports = {
    twitterKeys,
    spotifyKeys
   }
   
   * Make sure to remove the parenthesis inside the quotes so you only have your id, key, or secret inside the quotes and you dont 
     include this sentence in your code. 
 7. Go to (local)\liri-node-app\app and enter whichever of the search commands below you'd like.

## Commands

### node liri.js spotify-this-song (song name here)

This command will show the following information about the song in your terminal/bash window

   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from

if no song is provided then your program will default to
"The Sign" by Ace of Base


### node liri.js movie-this (movie name here)

This command will output the following information to your terminal/bash window:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   * Rotten Tomatoes Rating.
   * Rotten Tomatoes URL.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


### node liri.js my-tweets

This command will show your last 20 tweets and when they were created at in your terminal/bash window.


## node liri.js do-what-it-says 

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Feel free to change the text in that document to test out the feature for other commands.







