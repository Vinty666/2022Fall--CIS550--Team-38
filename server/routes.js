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

//Route 1
async function search_artists(req, res) {
    const billboard = req.query.billboard
    const grammy = req.query.grammy
    const genre = req.query.genre ? req.query.genre : '%%'
    const numAlbums = req.query.numAlbums ? req.query.numAlbums : 0
    const artist = req.query.artist ? req.query.artist : '%%'
    const followers = req.query.followers ? req.query.followers : 0


    if (billboard === "false" && grammy === "false") {
        connection.query(`SELECT artistName AS artist, followers, numAlbums, GroupSolo 
        FROM Artist
        WHERE artistName LIKE '%${artist}%' AND genres Like '%${genre}%' AND numAlbums >= ${numAlbums} AND followers >= ${followers}
        ORDER BY followers DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                console.log("1: " + results.length)
                res.json({ results: results })
            }
        })
    } else if (billboard === "false" && grammy === "true") {
        connection.query(`WITH GrammyArtist AS
            (SELECT artist AS artist FROM GrammyAlbum UNION SELECT artist FROM GrammySong)
            SELECT DISTINCT artistName AS artist, followers, numAlbums, yearFirst_album AS year, GroupSolo FROM GrammyArtist g JOIN Artist a on g.artist=a.artistName
            WHERE g.artist LIKE '%${artist}%' AND a.genres Like '%${genre}%' AND a.numAlbums >= ${numAlbums} AND a.followers >= ${followers}
            ORDER BY followers DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                console.log("2: " + results.length)
                res.json({ results: results })
            }
        })
    } else if (billboard === "true" && grammy === "false") {
        connection.query(`
            SELECT DISTINCT artistName AS artist, followers, numAlbums, yearFirst_album AS year, GroupSolo FROM Billboard b JOIN Artist a on b.artist=a.artistName
            WHERE b.artist LIKE '%${artist}%' AND a.genres Like '%${genre}%' AND a.numAlbums >= ${numAlbums} AND a.followers >= ${followers}
            ORDER BY followers DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                console.log("3: " + results.length)
                res.json({ results: results })
            }
        }
        );
    } else {
        connection.query(`
            WITH GrammyArtist AS
            (SELECT artist FROM GrammyAlbum UNION SELECT artist FROM GrammySong)
            SELECT DISTINCT artistName AS artist, followers, numAlbums, yearFirst_album AS year, GroupSolo FROM Billboard b JOIN GrammyArtist g ON b.artist=g.artist JOIN Artist a on b.artist=a.artistName
            WHERE b.artist LIKE '%${artist}%' AND a.genres Like '%${genre}%' AND a.numAlbums >= ${numAlbums} AND a.followers >= ${followers} 
            ORDER BY followers DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                console.log("4: " + results.length)
                res.json({ results: results })
            }
        }
        );
    }
}

//Route 2
async function search_songs(req, res) {
    const genre = req.query.genre ? req.query.genre : '%%'
    const song = req.query.song ? req.query.song : '%%'
    const year = req.query.year ? req.query.year : 2019
    const release = req.query.release ? req.query.release : "false"
    if (release === "true") {
        connection.query(`SELECT DISTINCT name as song, artist, genre
        FROM Billboard
        WHERE name LIKE '%${song}%' AND genre Like '%${genre}%' AND Year(week) = ${year} AND name NOT LIKE '%/%'
        ORDER BY song`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })
    } else {
        connection.query(`SELECT DISTINCT name as song, artist, genre
        FROM Billboard
        WHERE name LIKE '%${song}%' AND genre Like '%${genre}%' AND name NOT LIKE '%/%'
        ORDER BY song`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })
    }
}

//Query 2(optimized) -> route 3
async function search_collaborators(req, res) {
    const artist = req.params.artist;
    const popThreshold = req.query.popThreshold ? req.query.popThreshold : 0
    const folThreshold = req.query.folThreshold ? req.query.folThreshold : 0

    connection.query(
       `WITH Collab AS (SELECT name, collabArtist FROM Collaborators WHERE artist = '${artist}'),
        FamousCollab AS ( SELECT Collab.collabArtist AS collabArtist, Collab.name AS songs FROM Collab
            INNER JOIN
               (SELECT S.artist as artist, S. songName as song FROM SongAttributes S WHERE S.popularity >= ${popThreshold}) FamousCollabSongs
            ON Collab.name = FamousCollabSongs.song ),
        FamousArtists AS (SELECT artistName, followers FROM Artist WHERE followers >= ${folThreshold})
   
        SELECT DISTINCT FamousCollab.collabArtist AS artists, FamousCollab.songs, FamousArtists.followers
        FROM FamousCollab
        INNER JOIN FamousArtists ON FamousArtists.artistName = FamousCollab.collabArtist;`,
        function (error, results, fields) {
            if (error) {
                comsole.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}


//Query 3(optimized) -> route 4
// Description: 
// To get potential collaborators: Select the co-artist of the
// co-artist of an ${artist} where co-artists of co-artists have published at
// least ${hits threshold} hit songs and has followers >= ${fol threshold}
async function search_co_cooperator(req, res) {

    const artist = req.params.artist
    const folThreshold = req.query.fol_threshold ? req.query.fol_threshold : 0
    const hitsThreshold = req.query.hits_threshold ? req.query.hits_threshold : 0

    connection.query(`
    WITH CO1_artist AS ( SELECT collabArtist FROM Collaborators where artist = '${artist}' ),
     CO2_artist AS ( SELECT collabArtist, name FROM Collaborators where artist IN (SELECT * FROM CO1_artist)),
     FamousCollabArtist AS
        ( SELECT DISTINCT collabArtist, name FROM CO2_artist
            INNER JOIN (SELECT artistName FROM Artist WHERE followers >= ${folThreshold}) Famous
            ON Famous.artistName = collabArtist )
    SELECT collabArtist AS artist FROM (SELECT collabArtist, COUNT(name) AS hitSongNum FROM FamousCollabArtist GROUP BY collabArtist) famousCO2hitsNum WHERE
    hitSongNum >= ${hitsThreshold} AND collabArtist != '${artist}';`, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Query 7: Show all artists that have followers large than some number, and have at least sepcific hit songs, whose average popularity is greater than some threshold.
// route 5
async function searchArtistsWithPopularitySongs(req, res) {
    const avg_popularity = req.query.popularity ? req.query.popularity : 0;
    const numOfSongs = req.query.numSongs ? req.query.numSongs : 0;
    connection.query(`WITH cte AS (
        SELECT b.artist, b.name, a.followers
        FROM Billboard b, Artist a
        WHERE b.artist = a.artistName
         )
     SELECT DISTINCT c.artist, avg(popularity) AS avg_popularity, count(*) AS numOfSongs, followers
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
// route 6
async function searchArtistsGrammyWithTimeDiff(req, res) {
    connection.query(`SELECT b.artist, g.grammyYear, g.songName, (MIN(g.grammyYear) - MIN(substring(date, -4, 4))) AS yearDiff
    FROM Billboard b
    INNER JOIN GrammySong g
    on g.artist = b.artist
    Group By b.artist
    Having yearDiff >= 0
    Order by yearDiff DESC`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// new query 11 -> ArtistDetails page
// route 7
// Select * from artist, join with billboard to get this artist's number of hits
async function searchArtistDetails(req, res) {
    const artist = req.params.artist
    connection.query(`SELECT * FROM Artist LEFT JOIN (SELECT artist, COUNT(DISTINCT name) AS hits_num, GROUP_CONCAT(DISTINCT name SEPARATOR ', ') AS hits FROM Billboard GROUP BY artist) B
    ON Artist.artistName=B.artist
    WHERE artistName = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// new query 12 -> ArtistDetails page
// route 7
// select grammy-winning albums by artist name
async function searchArtistGrammyAlbum(req, res) {
    const artist = req.params.artist
    connection.query(`SELECT * FROM GrammyAlbum WHERE artist = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    })
}

// new query 13 -> ArtistDetails page
// route 8
// select grammy-winning songs by artist name
async function searchArtistGrammySong(req, res) {
    const artist = req.params.artist
    connection.query(`SELECT * FROM GrammySong WHERE artist = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    })
}

// new query 14-16 -> SongDetails page
// route 9
async function searchSongDetails(req, res) {
    const songName = req.params.songName
    const artist = req.params.artist
    connection.query(`SELECT * FROM SongAttributes WHERE songName = '${songName}' AND artist = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    })
}

// route 10
async function searchSongGrammy(req, res) {
    const songName = req.params.songName
    const artist = req.params.artist
    connection.query(`SELECT * FROM GrammySong WHERE songName = '${songName}' AND artist = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    })
}

// route 11
async function searchSongBillboard(req, res) {
    const songName = req.params.songName
    const artist = req.params.artist
    connection.query(`SELECT genre, peakPosition, weeklyRank, week, lyric FROM Billboard WHERE name LIKE '%${songName}%' AND artist = '${artist}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    })
}


module.exports = {
    searchArtistsWithPopularitySongs,
    searchArtistsGrammyWithTimeDiff,
    search_artists,
    search_songs,
    search_collaborators,
    search_co_cooperator,
    searchArtistDetails,
    searchArtistGrammyAlbum,
    searchArtistGrammySong,
    searchSongDetails,
    searchSongGrammy,
    searchSongBillboard
}
