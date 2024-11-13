const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "media/videos/", // Destination directory for storing uploaded videos
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix  + '-' + file.originalname);
  }
});
 
const uploadVideo = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedVideo = /mp4|avi|mkv|mov/; // Supported video formats
    const extension = path.extname(file.originalname);
    if (supportedVideo.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File must be a video (MP4, AVI, MKV, MOV)."));
    }
  },
  limits: {
    fileSize: 500 * 1024 * 1024 // Limiting file size to 500MB (adjust as needed)
  }
});

module.exports = uploadVideo;
