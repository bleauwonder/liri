require('dotenv').config();
var inquirer = require('inquirer');
var fs = require('fs');

var moment = require('moment');
var axios = require('axios');

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = (keys.oK);
var bandsintown = (keys.bITK);

var liriQuery = process.argv[2];

if (liriQuery === "concert-this") {
    showConcert();
} else if (liriQuery === "spotify-this-song") {
    spotifyThis();
} else if (liriQuery === "movie-this") {
    showMovie();
} else if (liriQuery === "do-what-it-says") {
    doIt();
} else {
    console.log("Welcome to LIRI! Please enter 'node liri' and one of the following commands: concert-this, spotify-this-song, movie-this, do-what-it-says.");
}

// LIRI will look for a song from the Spotify API
function spotifyThis() {
    inquirer
        .prompt([
            {
                name: 'song',
                message: "What song do you want to know about?",
                default: "The Sign by Ace of Base"
            },
        ]).then(function(answers) {
    spotify.search({ type: 'artist,track', query: answers.song, limit: 5}, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    var songs = "---------------------------------" + "\nArtist(s): " + response.tracks.items[0].artists[0].name + "\nSong Name: " + response.tracks.items[0].name + "\nAlbum Name: " + response.tracks.items[0].album.name + "\nPreview Link: " + response.tracks.items[0].external_urls.spotify +
    "\n--------------------------";
    console.log(songs);
        fs.appendFile("log.txt", songs, function(err) {
            if (err) {
            if (err) throw err;
                console.log(songs);
            }
        })
    })
    })
};

// LIRI will look for concerts from the Bands In Town API
function showConcert() {
    inquirer
        .prompt([
            {
                name: 'concert',
                message: "What artist do you want to see?",
                default: "The Cure"
            },
        ]).then(function(answers) {
            axios.get("https://rest.bandsintown.com/artists/" + answers.concert + "/events?app_id=" + bandsintown)
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        let concerts = "----------------------------------" + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nDate of the Event: " + 
                        moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------------------------";
                        console.log(concerts);
                        fs.appendFile("log.txt", concerts, function(err) {
                            if (err) {
                            if (err) throw err;
                            console.log(concerts);
                            }
                        })
                    }
                })
        .catch(function(error) {
            console.log(error);
        });
    })
};
        
// LIRI will find the movie from the OMDB API
function showMovie () {
    inquirer
        .prompt([
            {
                name: 'movie',
                message: "What movie to you want to know more about?",
                default: "The Shining"
            },
        ]).then(function(answers) {
            axios.get("http://www.omdbapi.com/?t=" + answers.movie + "&y=&plot=short&apikey=" + omdb)
        .then(function (response) {
                let movie = "----------------------------------" + "\nMovie Name: " + response.data.Title + "\nMovie Year: " + response.data.Year + "\nMovie Rating: " + 
                response.Rated + "\nImdb Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors and Actresses: " + response.data.Actors +
                
                "\n--------------------------------";
                console.log(movie);
                fs.appendFile("log.txt", movie, function(err) {
                    if (err) {
                        if (err) throw err;
                        console.log(movie);
                    }
                })
                
            }
        )
        .catch(function(error) {
            console.log(error);
        });
    
        }) 
    
    };

// LIRI will take the text inside ramdom.txt and use it to call one of LIRI's commands
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
    var dataArr = data.split(",");

    spotify.search({ type: 'artist,track', query: dataArr[1], limit: 5}, function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songs = "---------------------------------" + "\nArtist(s): " + response.tracks.items[0].artists[0].name + "\nSong Name: " + response.tracks.items[0].name + "\nAlbum Name: " + response.tracks.items[0].album.name + "\nPreview Link: " + response.tracks.items[0].external_urls.spotify +
        "\n--------------------------";
        console.log(songs);
        });
    })
};