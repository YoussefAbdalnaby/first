const { uploadToCloudinary } = require("../cloudinaryHelpers/cloudinaryHelper.js");
const Image = require("../database/image.js");
const fs=require('fs');
const cloudinary = require('../imageConfig/config.js');


exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "no file provided" });
        const filePath = req.file.path;
        const result = await uploadToCloudinary(filePath);
        
        const newImage = new Image({
            url: result.url,
            publicId: result.publicId,
            uploadedBy: req.user.id
        });

        await newImage.save();

        res.status(201).json({ message: "image uploaded successfully", image: newImage });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getImages = async (req, res) => {
    try {
        const limit=req.query.limit || 5;
        const page=req.query.page || 1;
        const skip=(page-1)*limit;
        const sortedBy=req.query.sortedBy || 'createdAt';
        const sortOrder=req.query.sortOrder==='asc'?1:-1;
        const totalImages=await Image.countDocuments({ uploadedBy: req.user.id });
        const totalPages=Math.ceil(totalImages/limit);
        const sortObj={};
        sortObj[sortedBy]=sortOrder;

        const images = await Image.find({ uploadedBy: req.user.id })
            .select('url -_id')
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit));
res.status(200).json({
    images,
    pagination:{
        totalImages,
        totalPages,
        currentPage:parseInt(page),
        limit:parseInt(limit)
    }} )
  }
    catch (error) { 
        console.error('Fetch Error:', error);
        res.status(500).json({ message: error.message });
    }
};




exports.deleteFromCloudinary = async (req, res) => {
    try {
        const imageId = req.params.id;
        const userId = req.user.id;

        // Find the image
        const image = await Image.findOne({publicId: imageId});
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Check ownership
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from database
        await Image.findByIdAndDelete(image._id);

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}




