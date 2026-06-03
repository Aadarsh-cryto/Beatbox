const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");

const jwt = require("jsonwebtoken");

async function createMusic(req, res) {


    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(
        file.buffer.toString("base64")
    );

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    });

    return res.status(201).json({
        message: "music created successfully",
        music: {
            id: music._id,
            title: music.title,
            uri: music.uri,
            artist: music.artist
        }
    });
}

async function createAlbum(req, res) {


        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics
        });

        return res.status(201).json({
            message: "album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

    }
 async function getAllMusics(req,res){
    const musics = await musicModel.find().limit(10).populate("artist","username")
    res.status(200).json({
        message:"musics fetched succesfully",
        musics:musics,
    })
 }

 async function getAllAlbums(req,res) {
    const albums = await albumModel.find().limit(10).select("title artist").populate("artist","username").populate("musics");
    res.status(200).json({
        message:"albums feched succesfully",
        albums:albums,
    })
    
 }

 async function getAlbumById(req,res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist","username").populate("musics")
 return res.status(200).json({
    message:"album fetched succesfully",
    album:album,
 })

 }
 async function addMusicToAlbum(req, res) {
  const { albumId, musicId } = req.body;

  const album = await albumModel.findById(albumId);

  if (!album) {
    return res.status(404).json({
      message: "Album not found",
    });
  }

  if (!album.musics.includes(musicId)) {
    album.musics.push(musicId);
    await album.save();
  }

  return res.status(200).json({
    message: "Music added to existing album successfully",
    album,
  });
}
module.exports = {
    createMusic,
    createAlbum,
     getAllMusics,
     getAllAlbums,
     getAlbumById ,
        addMusicToAlbum
}