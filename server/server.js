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

// Query 6
app.get('/search/artists/:followers', routes.searchArtistsWithFollowers)

// Query 7
app.get('/search/artists/:followers/:popularity/:numSongs', routes.searchArtistsWithPopularitySongs)

// Query 8
app.get('/search/artists/grammy/:yearDiff', routes.searchArtistsGrammyWithTimeDiff)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
