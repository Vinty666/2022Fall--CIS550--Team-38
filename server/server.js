const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));


//Query 1
app.get('/getArtist',routes.search_artist)

//Query 2
app.get('/getArtist/cooperators/:artist',routes.search_collaborators)

// Query 3 - register as GET
app.get('/getArtist/coCooperators/:artist', routes.search_co_cooperator)

// Query 4 - register as GET
app.get('/getTopSong',routes.search_top_songs)

// Query 5 - register as GET
app.get('/getSongsByYear/:year', routes.search_specific_songs)

// Query 6
app.get('/getArtistsByFollowers', routes.searchArtistsWithFollowers)

// Query 7
app.get('/getArtistsByPopularitySongs', routes.searchArtistsWithPopularitySongs)

// Query 8
app.get('/getGrammyArtists', routes.searchArtistsGrammyWithTimeDiff)

// Query 9
app.get('/getAlbum/genre', routes.grammyAlbumsWithinTime)

// Query 10
app.get('/getTopArtists', routes.searchTopArtists)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
