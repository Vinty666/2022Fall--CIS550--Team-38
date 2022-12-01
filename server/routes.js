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
//Hanlin
//Query 1
async function search_artist(req,res)
{
    const genre=req.query.genre?req.query.genre:'%pop%'
    const certainYear=req.query.certainYear?req.query.certainYear:2013
    const weeks=req.query.weeks?req.query.weeks:2
    const albumThreshold = req.query.albumThreshold?req.query.albumThreshold:1;

    connection.query(`
        WITH GrammyArtist AS
         ( SELECT A.artistName FROM Artist A,
         ( SELECT artist,grammyYear FROM GrammyAlbum UNION SELECT artist,
         grammyYear FROM GrammySong GROUP BY artist, grammyYear )AS awarded_artist
         WHERE A.artistName=awarded_artist.artist AND awarded_artist.GrammyYear=${certainYear}
         and A.numAlbums > ${albumThreshold} )
         SELECT artist FROM Billboard JOIN Artist ON Billboard.artist=Artist.artistName,GrammyArtist
         WHERE Artist.gender= "F" AND Artist.genres like "${genre}" AND Artist.artistName=GrammyArtist.artistName
          HAVING count(*)>${weeks}`,function(error,results,fields)
        {
            if(error)
            {
                console.log(error)
                res.json({error:error})
            } else if(results)
            {
                res.json({results:results})
            }
        }
    );
}
//Query 2
async function search_collaborators(req,res)
{
    const artist=req.query.artist?req.query.artist:'Justin Bieber'
    const popThreshold= req.query.popThreshold?req.query.popThreshold:30
    const folThreshold=req.query.folThreshold?req.query.folThreshold:50000

    connection.query(
        `WITH TargetArtistWork AS ( SELECT name, date FROM Billboard WHERE artist = "${artist}"), 
         Collab AS ( SELECT B.artist AS artists, B.name AS songs FROM Billboard B INNER JOIN TargetArtistWork 
         ON ((TargetArtistWork.name = B.name) AND (TargetArtistWork.date = B.date)) 
         WHERE B.artist != "${artist}"), FamousCollab AS 
         ( SELECT artists, songs FROM Collab 
         INNER JOIN 
         (SELECT S.artist as artist, S. songName as song 
         FROM SongAttributes S 
         WHERE S.popularity >= ${popThreshold}) FamousCollabSongs ON songs = FamousCollabSongs.song )
         SELECT DISTINCT FamousCollab.artists, FamousCollab.songs 
         FROM FamousCollab 
         INNER JOIN
         (SELECT artistName FROM Artist 
         WHERE followers >= ${folThreshold}) FamousArtists ON FamousArtists.artistName = FamousCollab.artists;`,
        function(error,results,fields)
        {
            if(error)
            {
                comsole.log(error)
                res.json({error:error})
            } else if(results)
            {
                res.json({results:results})
            }
        });
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
    search_grammy_artist,
    search_artist,
    search_collaborators
}