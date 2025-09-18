const cloudinary = require('../imageConfig/config.js');
const Image = require("../database/image.js");

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error('Cloudinary Error:', error);
        throw error;
    }
};



module.exports = { uploadToCloudinary };
