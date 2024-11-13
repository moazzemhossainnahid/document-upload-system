const express = require('express');
const ImageController = require('../Controllers/images.controller');
const uploadImage = require('../Middleware/uploadImage');

const router = express.Router();

router.post('/add-image',uploadImage.single("image"), ImageController.addAnImage);

router.get('/', ImageController.getAllImages);

router.delete('/:id', ImageController.deleteAnImage);




module.exports = router;