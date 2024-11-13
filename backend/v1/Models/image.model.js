const mongoose = require("mongoose");


const imagesSchema = mongoose.Schema(
    {
        image: {
          type: String,
          required: false,
        }
      },
      {
        timestamps: true,
      }
);


const Images = mongoose.model("images", imagesSchema);

module.exports = Images;