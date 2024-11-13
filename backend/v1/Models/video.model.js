const mongoose = require("mongoose");


const videosSchema = mongoose.Schema(
    {
        video: {
          type: String,
          required: false,
        }
      },
      {
        timestamps: true,
      }
);


const Videos = mongoose.model("videos", videosSchema);

module.exports = Videos;