require('dotenv').config();
var inquirer = require('inquirer');
var moment = require('moment');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

var showConcert = function() {
inquirer
    .prompt([
        {
            name: 'concert',
            message: "What artist do you want to see?",
            default: "The Cure"
        },
    ]).then(function(answers) {
        axios.get("https://rest.bandsintown.com/artists/" + answers.concert + "/events?app_id" + spotify)
    .then(function (response) {
        for (var i = 0; i < 5; i++) {
            let concerts = "----------------------------------" + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nDate of the Event: " + 
            moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------------------------";
            console.log(concerts);
         
        }
    })
    .catch(function(error) {
        console.log(error);
    });

    })
};

showConcert();


var showMovie = function() {
inquirer
    .prompt([
        {
            name: 'movie',
            message: "What movie to you want to know more about?",
            default: "The Shining"
        },
    ]).then(function(answers) {
        axios.get("http://www.omdbapi.com/?apikey=" + spotify + "&t")
    .then(function (response) {
        for (var i = 0; i < 5; i++) {
            let movie = "----------------------------------" + "\nVenue Name: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nDate of the Event: " + 
            moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n--------------------------------";
            console.log(movie);
         
        }
    })
    .catch(function(error) {
        console.log(error);
    });

    }) 

};

showMovie();



