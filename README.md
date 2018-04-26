# Language Interpretation and Recognition Interface(LIRI)
LIRI is a command line node app that allows the user to retrieve data from Spotify, Twitter, and OMDB.

## Purpose
No longer do you have to open your browser or multiple apps to get the raw data from your favorite entertainment and social media sites. LIRI is an example of that. All you need is one terminal window, a couple of action commands and armed with a list of song or movie titles.

## How it works

### node liri.js spotify-this-song '(song name here>)'

This command will show the following information about the song in your terminal/bash window

   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from

if no song is provided then your program will default to
"The Sign" by Ace of Base


### node liri.js movie-this '<movie name here>'

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


### node liri.js do-what-it-says 

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. 

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Feel free to change the text in that document to test out the feature for other commands.


## Deployment
https://github.com/yocodigo/Project-1

## Node Packages Used
* Twitter
* Spotify




### node liri.js my-tweets

This command will show your last 20 tweets and when they were created at in your terminal/bash window.


