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

// Route 2 (for CIS550 final course project)
// Description: 
// To show details of specific songs which are on billboard and
// win grammy at least once at certain year, details including song attributes, artist name,
// lyrics, grammyAward, etc..
async function search_specific_songs(req, res) {

    const year = req.params.year ? req.params.year : '2004'

    connection.query( `
    SELECT DISTINCT s.songName, s.Artist, s.Danceability,
    s.Duration, s.Energy, s.Liveness, b.lyric,
    g.grammyAward, g.grammyYear
    FROM SongAttributes s
    INNER JOIN Billboard b
    on s.songName = b.Name
    INNER JOIN GrammySong g
    on s.songName = g.songName
    WHERE g.grammyYear = ${year}`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 3 (for CIS550 final course project)
// Description: 
// Find top 5 hit songs has given genre (inputGenre)
async function search_top_songs(req, res) {

    const inputGenre = req.params.genre ? req.params.genre : 'Pop'

    const t = '%'

    connection.query( `
    SELECT DISTINCT name
    FROM Billboard
    WHERE genre LIKE '${t+inputGenre+t}'
    LIMIT 5;`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 4 (for CIS550 final course project)
// Description: 
// To get potential collaborators: Select the co-artist of the
// co-artist of an ${artist} where co-artists of co-artists have published at
// least ${hits threshold} hit songs and has followers >= ${fol threshold}
async function search_co_cooperator(req, res) {

    const artist = req.query.artist ? req.query.artist : "Justin Bieber"
    const fol_threshold = req.query.fol_threshold ? req.query.fol_threshold : "50000"
    const hits_threshold = req.query.hits_threshold ? req.query.hits_threshold : "20"

    connection.query( `
    WITH TargetArtistWork AS
    ( SELECT name, date FROM Billboard where artist =
    '${artist}' ),
    CO1_artist AS
    ( SELECT DISTINCT B.artist AS artists FROM Billboard
    B INNER JOIN TargetArtistWork ON ((TargetArtistWork.name =
    B.name) AND (TargetArtistWork.date = B.date)) WHERE B.artist
    != '${artist}' ),
    CO1_songs AS
    ( SELECT name, date FROM Billboard WHERE artist IN
    (SELECT * FROM CO1_artist) ),
    CO2_artist AS
    ( SELECT DISTINCT B.artist AS artists FROM Billboard
    B INNER JOIN CO1_songs ON ((CO1_songs.name = B.name) AND
    (CO1_songs.date = B.date)) ),
    CO2_artist_song AS
    ( SELECT artist, name FROM Billboard WHERE artist IN
    (SELECT * FROM CO2_artist) ),
    FamousArtist AS
    ( SELECT DISTINCT artist, name FROM CO2_artist_song
    INNER JOIN (SELECT artistName FROM Artist WHERE followers >=
    ${fol_threshold}) Famous ON Famous.artistName = artist )
    SELECT artist FROM (SELECT artist, COUNT(name) AS hitSongNum
    FROM FamousArtist GROUP BY artist) famousCO2hitsNum WHERE
    hitSongNum >= ${hits_threshold} AND artist !=
    '${artist}';`, function (error, results, fields) {

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
    search_specific_songs,
    search_top_songs,
    search_co_cooperator
}