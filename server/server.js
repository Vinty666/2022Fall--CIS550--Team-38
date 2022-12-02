const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

//Query 1
app.get('/search/artists/searchArtist/',routes.search_artist)
//Query 2
app.get('/search/artist/collaborators/',routes.search_collaborators)

// Query 6
app.get('/search/artists/:followers', routes.searchArtistsWithFollowers)

// Query 7
app.get('/search/artists/:followers/:popularity/:numSongs', routes.searchArtistsWithPopularitySongs)

// Query 8
app.get('/search/artists/grammy/:yearDiff', routes.searchArtistsGrammyWithTimeDiff)

// Query 5 - register as GET
app.get('/search/specificSongs/:year', routes.search_specific_songs)

// Query 3 - register as GET
app.get('/search/bfsCoCooperator/', routes.search_co_cooperator)

// Query 4 - register as GET
app.get('/search/topSong/:genre',routes.search_top_songs)
//Route

// Query 9
app.get('/search/album/genre', routes.grammyAlbumsWithinTime)

// Query 10
app.get('/search/topArtists/:artist', routes.searchTopArtists)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
