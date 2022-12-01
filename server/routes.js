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


// Query 6: Show all artist that have followers large than a inputNumber
async function searchArtistsWithFollowers(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    const followers = req.params.followers ? req.params.followers : 0
    connection.query(`SELECT DISTINCT artistName, followers, genres 
    FROM Artist 
    WHERE followers > '${followers}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Query 7: Show all artists that have followers large than some number, and have at least sepcific hit songs, whose average popularity is greater than some threshold.
async function searchArtistsWithPopularitySongs(req, res) {
    const followers = req.params.followers ? req.params.followers : 0;
    const avg_popularity = req.params.popularity? req.params.popularity : 0;
    const numOfSongs = req.params.numSongs? req.params.numSongs : 0;
    connection.query(`WITH cte AS (
        SELECT b.artist, b.name, a.followers
        FROM Billboard b, Artist a
        WHERE b.artist = a.artistName and a.followers >= '${followers}'
         )
     SELECT c.artist, avg(popularity) AS avg_popularity, count(*) AS numOfSongs, followers
     FROM cte c, SongAttributes s
     WHERE c.name = s.songName and s.artist = c.artist
     GROUP BY c.artist, c.name
     HAVING  avg_popularity >= '${avg_popularity}' and numOfSongs >= '${numOfSongs}'
     ORDER BY avg_popularity DESC, numOfSongs`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


// Query 8: Find all artists who won grammy awards with given time difference between their first billboard hit songs since 1999 and their first grammy-awarded song, sort by time difference
async function searchArtistsGrammyWithTimeDiff(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    const yearDiff = req.params.yearDiff ? req.params.yearDiff : 0;
    connection.query(`SELECT b.artist, g.grammyYear, g.songName, (MIN(g.grammyYear) - MIN(substring(date, -4, 4))) AS yearDiff
    FROM Billboard b
    INNER JOIN GrammySong g
    on g.artist = b.artist
    Group By b.artist
    HAVING yearDiff >= '${yearDiff}'
    Order by yearDiff DESC`, function (error, results, fields) {
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
    searchArtistsWithFollowers,
    searchArtistsWithPopularitySongs,
    searchArtistsGrammyWithTimeDiff
}