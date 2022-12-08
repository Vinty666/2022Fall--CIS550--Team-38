import config from './config.json'


//Just for testing
const searchArtist=async(genre,certainYear,weeks,albumThreshold)=>{
var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtist/genre=${genre}&certainYear=${certainYear}&weeks=${weeks}&albumThreshold=${albumThreshold}`,{
    method:'GET'
})
    return res.json();
}

const searchCollaborators=async(artist,popThreshold,folThreshold)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtist/cooperators/artist=${artist}&popThreshold=${popThreshold}&folThreshold=${folThreshold}`,{
        method:'GET'
    })
    return res.json();
}

const searchCoCooperator=async(artist,folThreshold,hitsThreshold)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtist/coCooperators/artist=${artist}&fol_threshold=${folThreshold}&hits_threshold=${hitsThreshold}`,{
        method:'GET'
    })
    return res.json();
}

const searchTopSongs=async(genre)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getTopSong/inputGenre=${genre}`,{
        method:'GET'
    })
    return res.json();
}

const searchSpecificSong = async(year)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getSongsByYear/year=${year}`,{
        method:'GET'
    })
    return res.json();
}

const searchArtistWithFollowers=async(followers)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtistsByFollowers?followers=${followers}`,{
        method:'GET'
    })
    return res.json();
}

const searchArtistsWithPopularitySongs=async(followers,avg_popularity,numOfSongs)=>
{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtistsByPopularitySongs?followers=${followers}&avg_popularity=${avg_popularity}&numOfSongs=${numOfSongs}`,
        {
            method:'GET'
        })
    return res.json();
}

const searchArtistsGrammyWithTimeDiff=async(yearDiff)=>
{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getGrammyArtists?yearDiff=${yearDiff}`,{
        method:'GET'
    })
    return res.json();
}

const getGrammyAlbumsWithinTime=async(inputGenre,startYear,endYear)=>
{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getAlbum/genre?inputGenre=${inputGenre}&startYear=${startYear}&endYear=${endYear}`,
        {
            method:'GET'
        })
    return res.json();
}

const searchTopArtist=async(artistName)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getTopArtists?artistName=${artistName}`,{
        method:'GET'
    })
    return res.json();
}
// //Reference
// const getAllMatches = async (page, pagesize, league) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
//
// const getAllPlayers = async (page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
//
// const getMatch = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
//
// const getPlayer = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
//
// const getMatchSearch = async (home, away, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }
//
// const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

export {
    searchArtist,
    searchCollaborators,
    searchTopSongs,
    searchCoCooperator,
    searchSpecificSong,
    searchArtistWithFollowers,
    searchArtistsWithPopularitySongs,
    searchArtistsGrammyWithTimeDiff,
    getGrammyAlbumsWithinTime,
    searchTopArtist,
}