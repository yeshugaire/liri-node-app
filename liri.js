var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');


var getMyTweets = function() {
	var client = new Twitter(keys);
  
	var params = {screen_name: 'yeshugaire'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    	console.log(tweets);

    		   for(var i=0; i<tweets.length; i++) {
    		   console.log(tweets[i].created_at);
    		   console.log(' ');
    		  console.log(tweets[i].text);

    		// }
        // else {
        //   console.log(error);
        // }
    	 }
      }
  });
};

var getArtistNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {
  

 	  var spotify = new Spotify({
 	  id: "08aa0a96ba1b4a5aa29901e335ad8dc6",
  	secret: "9304a1ffc4b74d48b2a82ffa4e94308d"
});

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
  		var songs = data.tracks.items;
      for(var i = 0; i<songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('---------------------------------------');

      }
	});
}

var getMeMovie = function(movieName) {


	request('https://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) 
		{
		if(!error && response.statusCode == 200) {
  		//console.log(body); 

  			var jsonData = JSON.parse(body);

  			console.log('Title: ' + jsonData.Title);
  			console.log('Year: ' + jsonData.Year);
  			console.log('IMDB Rating: ' + jsonData.imdbRating);
  			console.log('Rotten tomatoes rating: ' + jsonData.Ratings[1].Value);
  			console.log('Country: ' + jsonData.Country);
  			console.log('Language: ' + jsonData.Language);
  			console.log('Plot: ' + jsonData.Plot);
  			console.log('Actors: ' + jsonData.Actors);
  			
  			
  		}

	});
}

var doWhatItSays = function() {

 		fs.readFile('random.txt',  'utf8', function (err, data) {
  		if (err) throw err;
  	
  		var dataArr = data.split(',');

  		if (dataArr.length == 2) {
  		pick(dataArr[0], dataArr[1]);
  		} else if (dataArr.length ==1) {
  		pick(dataArr[0]);

  		}

  	
	});

 }
 	

var pick = function(caseData, functionData) {
		switch(caseData) {
		    case 'my-tweets':
			       getMyTweets();
			       break;
		    case 'spotify-this-song':
		        getMeSpotify(functionData);
		        break;	
		    case 'movie-this':
		        getMeMovie(functionData);
            break;
		    case 'do-what-it-says':
		        doWhatItSays();
		        break;
		    default:
		        console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	   pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);







