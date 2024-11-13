const express = require('express');
const VideoController = require('../Controllers/videos.controller');
const uploadVideo = require('../Middleware/uploadVideo');

const router = express.Router();

router.post('/add-video',uploadVideo.single("video"), VideoController.addAVideo);

router.get('/', VideoController.getAllVideos);

router.delete('/:id', VideoController.deleteAVideo);




module.exports = router;