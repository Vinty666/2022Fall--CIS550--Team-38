import config from './config.json'

const searchArtist=async(billboard,grammy,artist,genre,followers,numAlbums)=>{
    console.log(billboard, grammy, artist, genre, followers, numAlbums)
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtists?billboard=${billboard}&grammy=${grammy}&artist=${artist}&genre=${genre}&followers=${followers}&numAlbums=${numAlbums}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

const searchSong=async(song, genre, year, release)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getSongs?song=${song}&genre=${genre}&year=${year}&release=${release}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

const searchHitSongArtist=async(songNum, popularity)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getArtistsByPopularSongs?numSongs=${songNum}&popularity=${popularity}`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

const searchGrammyAwardTrending=async()=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/getGrammyArtistsTrending`,{
        method:'GET'
    })
    const result = await res.json()
    return result;
}

const searchCollaborators=async(artist,popThreshold,folThreshold)=>{
    var res=await fetch(`http://${config.server_host}:${config.server_port}/artist_details/getCollaborators/${artist}?popThreshold=${popThreshold}&folThreshold=${folThreshold}`,{
        method:'GET'
    })
    return res.json();
}

const searchCoCooperator=async(artist,folThreshold,hitsThreshold)=>{
    console.log(artist, hitsThreshold, folThreshold)
    var res=await fetch(`http://${config.server_host}:${config.server_port}/artist_details/getPotentialCollaborators/${artist}?fol_threshold=${folThreshold}&hits_threshold=${hitsThreshold}`,{
        method:'GET'
    })
    return res.json();
}

const getArtistDetailsSearch=async(artist)=>{
    
    const url = `http://${config.server_host}:${config.server_port}/artist_details/${artist}`
    console.log("start fetching", artist, url)
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

const getArtistGrammyAlbumSearch=async(artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/artist_details/getGrammyAlbums/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

const getArtistGrammySongSearch=async(artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/artist_details/getGrammySongs/${artist}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

const getSongDetailsSearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/getSongDetails/${artist}/${songName}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

const getSongGrammySearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/grammy/${artist}/${songName}`
    var res=await fetch(url, {method: 'GET'})
    const results = await res.json();
    return results;
}

const getSongBillboardSongSearch=async(songName, artist)=>{
    const url = `http://${config.server_host}:${config.server_port}/song_details/billboard/${artist}/${songName}`
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