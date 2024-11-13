const express = require("express");
const Videos = require('../Models/video.model');
const fs = require('fs');
const path = require("path");
require('dotenv').config();

// add a video
exports.addAVideo = async (req, res) => {
    try {
        const data = req.body;

        // if (req.file) {
        //     data.video = `http://localhost:5000/videos/${req.file.filename}`;
        // };

        if (req.file) {
            data.video = `${process.env.ROOT}/videos/${req.file.filename}`;
        };

        const result = await Videos.create(data);
        res.send({
            success: true,
            message: 'Video Upload Successfully!',
            data: result,
        });
    } catch (error) {
        res.json(error);
    }
}


// get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const query = {};
        const result = await Videos.find(query);

        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a video
exports.deleteAVideo = async (req, res) => {
    try {
        const id = req.params.id;
        // Fetch the video record from the database to get the filename
        const video = await Videos.findById(id);
        if (!video) {
            return res.status(404).json({
                status: "failed",
                message: "Video not found"
            });
        }

        const videoUrl = video && video?.video;
        const filename = videoUrl.match(/[^/]+$/)[0];

        console.log("filename", filename);

        // Delete the file from the folder
        const filePath = path.join(__dirname, '..', '..', 'media', 'videos', filename);
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');

        // Delete the video record from the database
        const query = { _id: id };
        const result = await Videos.deleteOne(query);

        res.status(200).json({
            status: "Success",
            message: "Data Deleted Successfully !",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Delete Data",
            error: error.message
        });
    }
}
