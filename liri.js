require("dotenv").config();

var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var getTwitterFeed = function () {

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret,
    });

    var params = {
        screen_name: 'DavidRuso14'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.map(returnedValue => {
                console.log(returnedValue.created_at);
                console.log(returnedValue.text);
                console.log("");
            });
        }
    });
}

var getSongData = function (arg2) {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
    });

    spotify.search({
        type: 'track',
        query: arg2,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });
}

var chooseAFunction = function (arg1, arg2) {
    switch (arg1) {
        case "my-tweets":
            getTwitterFeed();
            break;
        case "spotify-this-song":
            getSongData(arg2);
            break;
        case "movie-this":
            break;
        case "do-what-it-says":
            break;
        default:
            console.log("invalid input");
    }
}

chooseAFunction(process.argv[2], process.argv[3]);