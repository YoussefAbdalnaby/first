const mongoose = require("mongoose");   

const reviewSchema = new mongoose.Schema({
    reviewerName:{String},
    rating:{type:Number,required:true,min:1,max:5},
    comment:{type:String},
    moive:{type:mongoose.Schema.Types.ObjectId,ref:"Moive",required:true}

},{timestamps:true})

const Review=mongoose.model("Review",reviewSchema)
module.exports=Review
