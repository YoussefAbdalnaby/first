const Moive = require("../database/moive.js");
const Review = require("../database/review.js");
const mongoose = require("mongoose");

// Insert a new moive
exports.insertMoive = async (req, res) => {
    try {
        const { title } = req.body;
        const newMoive = new Moive({ title });
        const savedMoive = await newMoive.save();
        res.status(201).json({ message: "Moive inserted successfully", savedMoive });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { moiveId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(moiveId)) {
            return res.status(400).json({ message: "Invalid moive ID" });
        }
        const { reviewerName, rating, comment } = req.body;
        const moive = await Moive.findById(moiveId);
        if (!moive) {
            return res.status(404).json({ message: "Moive not found" });
        }
        const newReview = new Review({ reviewerName, rating, comment, moive: moiveId });
        const savedReview = await newReview.save();
        res.status(201).json({ message: "Review added successfully", savedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getMoivesWithReviews = async (req, res) => {
try {
    const {moiveId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(moiveId)) {
        return res.status(400).json({ message: "Invalid moive ID" });
    }   
    const moive=await Moive.findById(moiveId);
    if(!moive){
        return res.status(404).json({message:"Moive not found"})
    }

const reviewsAggregate = await Review.aggregate([
    { $match: { moive: new mongoose.Types.ObjectId(moiveId) } },
    {
        $group: {
            _id: "$moive",
            avgRating: { $avg: "$rating" },
            reviews: {
                $push: {
                   
                    rating: "$rating",
                    comment: "$comment",
                    reviewerName: "$reviewerName"
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            moive: "$_id",
            avgRating: 1,
            reviews: 1
        }
    }
]);

    const reviews=await Review.find({moive:moiveId}).populate("moive","title -_id")
    .select("rating comment reviewerName -_id");
    res.status(200).json({message:"Moive reviews fetched successfully",reviewsAggregate})


} catch (error) {
    res.status(500).json({message:error.message})
    
}



}