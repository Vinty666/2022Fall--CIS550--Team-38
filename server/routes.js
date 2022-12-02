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

// Description: 
// To show details of specific songs which are on billboard and
// win grammy at least once at certain year, details including song attributes, artist name,
// lyrics, grammyAward, etc..
//Query 5
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


// Query 3 (for CIS550 final course project)
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

//Query 4 (for CIS550 final course project)
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