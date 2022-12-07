import config from './config.json'


//Hanlin Added here
//Just for testing
const searchArtist=async(genre,certainYear,weeks,albumThreshold)=>{
var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtist?genre=${genre}&certainYear=${certainYear}&weeks=${weeks}&albumThreshold=${albumThreshold}`,{
    method:'GET'
})
}

const searchCollaborators=async(artist,popThreshold,folThreshold)=>{
    var res=await fetch(`http://${config.server.host}:${config.server_port}/getArtist/cooperators?artist=${artist}&popThreshold=${popThreshold}&folThreshold=${folThreshold}`,{
        method:'GET'
    })
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
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch
}