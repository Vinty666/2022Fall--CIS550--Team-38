import config from './config.json'

//Route 1
const searchArtist=async(billboard,grammy,artist,genre,followers,numAlbums)=>{
    console.log(billboard, grammy, artist, genre, followers, numAlbums)
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtists?billboard=${billboard}&grammy=${grammy}&artist=${artist}&genre=${genre}&followers=${followers}&numAlbums=${numAlbums}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

//Route 2
const searchSong=async(song, genre, year)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getSongs?song=${song}&genre=${genre}&year=${year}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

//Route 3(query 7)
const searchHitSongArtist=async(songNum, popularity)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtistsByPopularSongs?numSongs=${songNum}&popularity=${popularity}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

//Route 4(query 8)
const searchGrammyAwardTrending=async()=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getGrammyArtistsTrending`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
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


export {
    searchArtist,
    searchSong,
    searchHitSongArtist,
    searchGrammyAwardTrending,
    searchCollaborators,
    searchCoCooperator,
    getArtistDetailsSearch,
    getArtistGrammyAlbumSearch,
    getArtistGrammySongSearch,
    getSongDetailsSearch,
    getSongGrammySearch,
    getSongBillboardSongSearch
}