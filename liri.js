require('dotenv').config();


var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);


 
inquirer
    .prompt([
        {
            name: 'song',
            message: "What song do you want to know about?",
            default: "The Sign by Ace of Base"
        },
    ]).then(function(answers) {
spotify.search({ type: 'track', query: answers.song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  var songs = "---------------------------------" + "\nArtist(s): " + Response.tracks.items[0].artists[0].name + "\nSong Name: " + Response.tracks.items[0].name +
  "\n--------------------------";
  console.log(songs);
// console.log(JSON.stringify(data, null, 2)); 
})
    });