const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.get('/getArtists',routes.search_artists)

app.get('/getSongs', routes.search_songs)

app.get('/artist_details/getCollaborators/:artist',routes.search_collaborators)

app.get('/artist_details/getPotentialCollaborators/:artist', routes.search_co_cooperator)

app.get('/getArtistsByPopularSongs', routes.searchArtistsWithPopularitySongs)

app.get('/getGrammyArtistsTrending', routes.searchArtistsGrammyWithTimeDiff)

app.get('/artist_details/:artist', routes.searchArtistDetails)

app.get('/artist_details/getGrammyAlbums/:artist', routes.searchArtistGrammyAlbum)

app.get('/artist_details/getGrammySongs/:artist', routes.searchArtistGrammySong)

app.get('/song_details/getSongDetails/:artist/:songName', routes.searchSongDetails)

app.get('/song_details/grammy/:artist/:songName', routes.searchSongGrammy)

app.get('/song_details/billboard/:artist/:songName', routes.searchSongBillboard)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
