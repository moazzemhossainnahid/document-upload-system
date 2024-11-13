const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: "media/images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
 
const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp|svg|svgz|gif|ico/;

    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File must be Png or Jpg image."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Limiting file size to 5MB (adjust as needed)
  }
});

module.exports = uploadImage;
