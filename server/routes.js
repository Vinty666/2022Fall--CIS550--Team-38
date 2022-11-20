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

// Route 9 (for CIS550 final course project)
// Description: 
// Select the names of the (genre) artist who won at least one Grammy award (both song and album) in (certain_year) and released > (some threshold) albums..
async function search_grammy_artist(req, res) {
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

    const AlbumThreshold = req.query.AlbumThreshold ? req.query.AlbumThreshold : "0"

    connection.query( `
    SELECT C.artistName 
    FROM GrammyAlbum A, GrammySong B, Artist C 
    WHERE C.Artist=A.Artist or C.Artist = B.Artist and C.NumAlbum >${AlbumThreshold} `, function (error, results, fields) {

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
    search_grammy_artist
}