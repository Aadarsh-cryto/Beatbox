  const express =require("express");
  const authMiddleware = require("../middlewares/auth.middleware")

const musicController = require("../controller/music.controller");
const multer = require("multer");
const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router();
router.post("/upload",authMiddleware.authArtist,upload.single("music"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist,musicController.createAlbum)
router.get("/",authMiddleware.authUser,musicController.getAllMusics)
router.get("/getallalbums",musicController.getAllAlbums)
router.get("/getalbums/:albumId",authMiddleware.authUser,musicController.getAlbumById)
router.post("/add-to-album",authMiddleware.authArtist,musicController.addMusicToAlbum)





module.exports = router;

