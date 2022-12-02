const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}






































































































































































































































// Query 9
async function grammyAlbumsWithinTime (req, res) {
    console.log("search grammy album")
    const inputGenre = req.query.genre ? req.query.genre : "pop"
    const startYear = req.query.startYear ? req.query.startYear : 1999
    const endYear = req.query.endYear ? req.query.endYear : 2018
    connection.query(`SELECT album, grammyYear 
    FROM GrammyAlbum 
    WHERE genre LIKE '${inputGenre}' and GrammyYear <= ${endYear} and GrammyYear >= ${startYear};`
    , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Query 10
async function searchTopArtists (req, res) {
    const artistName = req.query.artist ? req.query.artist : "%%"
    connection.query(`SELECT artistName, followers 
    FROM Artist 
    WHERE artistName LIKE '%${artistName}%'
    ORDER BY followers DESC 
    LIMIT 10;`    
    , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    hello,
    grammyAlbumsWithinTime,
    searchTopArtists,
    searchArtistsWithFollowers,
    searchArtistsWithPopularitySongs,
    searchArtistsGrammyWithTimeDiff,
    search_grammy_artist,
    search_artist,
    search_collaborators,
    search_specific_songs,
    search_top_songs,
    search_co_cooperator
}