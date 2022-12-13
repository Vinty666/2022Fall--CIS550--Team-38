import config from './config.json'

const searchArtist=async(genre,certainYear,weeks,albumThreshold)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtist?genre=${genre}&certainYear=${certainYear}&weeks=${weeks}&albumThreshold=${albumThreshold}`,{
        method:'GET'
    })
    return res.json();
}

// In ArtistDetails page
const searchCollaborators=async(artist,popThreshold,folThreshold)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/artist_details/getCollaborators/${artist}?popThreshold=${popThreshold}&folThreshold=${folThreshold}`,{
        method:'GET'
    })
    return res.json();
}

// In ArtistDetails page
const searchCoCooperator=async(artist,folThreshold,hitsThreshold)=>{
    console.log(artist, hitsThreshold, folThreshold)
    var res=await fetch(`http://${config.server_host}:${config.server_port}/artist_details/getPotentialCollaborators/${artist}?fol_threshold=${folThreshold}&hits_threshold=${hitsThreshold}`,{
        method:'GET'
    })
    return res.json();
}

// In ArtistDetails page
const getArtistDetailsSearch=async(artist)=>{
    
    const url = `http://${config.server_host}:${config.server_port}/artist_details/${artist}`
    console.log("start fetching", artist, url)
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

// In ArtistDetails page
const getArtistGrammyAlbumSearch=async(artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/artist_details/getGrammyAlbums/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

// In ArtistDetails page
const getArtistGrammySongSearch=async(artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/artist_details/getGrammySongs/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

// In SongDetails page
const getSongDetailsSearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/getSongDetails/${songName}/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

// In SongDetails page 
const getSongGrammySearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/grammy/${songName}/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

// In SongDetails page 
const getSongBillboardSongSearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/billboard/${songName}/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}


const searchTopSongs=async(genre)=>{

    var res=await fetch(`http://${config.server_host}:${config.server_port}/getTopSong/${genre}`,{
        method:'GET'
    })
    return res.json();
}

const searchSpecificSong = async(year)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getSongsByYear/${year}`,{
        method:'GET'
    })
    return res.json();
}

const searchArtistWithFollowers=async(followers)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtistsByFollowers?followers=${followers}`,{
        method:'GET'
    })
    return res.json();
}

const searchArtistsWithPopularitySongs=async(followers,avg_popularity,numOfSongs)=>
{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtistsByPopularitySongs?followers=${followers}&avg_popularity=${avg_popularity}&numOfSongs=${numOfSongs}`,
        {
            method:'GET'
        })
    return res.json();
}

const searchArtistsGrammyWithTimeDiff=async(yearDiff)=>
{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getGrammyArtists?yearDiff=${yearDiff}`,{
        method:'GET'
    })
    return res.json();
}

const getGrammyAlbumsWithinTime=async(inputGenre,startYear,endYear)=>
{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getAlbum/genre?inputGenre=${inputGenre}&startYear=${startYear}&endYear=${endYear}`,
        {
            method:'GET'
        })
    return res.json();
}

const searchTopArtist=async(artistName)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getTopArtists?artistName=${artistName}`,{
        method:'GET'
    })
    return res.json();
}

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
    getArtistDetailsSearch,
    getArtistGrammyAlbumSearch,
    getArtistGrammySongSearch,
    getSongDetailsSearch,
    getSongGrammySearch,
    getSongBillboardSongSearch
}