const express = require("express");
const Images = require('../Models/image.model');
const fs = require('fs');
const path = require("path");
require('dotenv').config();

// add a image
exports.addAnImage = async (req, res) => {
    try {
        const data = req.body;

        // if (req.file) {
        //     data.image = `http://localhost:5000/images/${req.file.filename}`;
        // };

        if (req.file) {
            data.image = `${process.env.ROOT}/images/${req.file.filename}`;
        };

        const result = await Images.create(data);

        res.status(200).json({
            status: "Successful",
            message: "Image Upload Successfully!",
            data: result
        });
    } catch (error) {
        res.json(error);
    }
}


// get all images
exports.getAllImages = async (req, res) => {
    try {
        const query = {};
        const result = await Images.find(query);

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


// delete a image
exports.deleteAnImage = async (req, res) => {
    try {
        const id = req.params.id;
        // Fetch the image record from the database to get the filename
        const image = await Images.findById(id);
        if (!image) {
            return res.status(404).json({
                status: "failed",
                message: "Image not found"
            });
        }

        const imageUrl = image && image?.image;
        const filename = imageUrl.match(/[^/]+$/)[0];

        // Delete the file from the folder
        const filePath = path.join(__dirname, '..', '..', 'media', 'images', filename);
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');


        const query = { _id: id };
        const result = await Images.deleteOne(query);


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
