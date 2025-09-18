const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({

title:{type:String,
        required:[true,"book title is required"]
            ,trim:true,
                maxLenght:[100,"book title should not exceed 100 characters"]},
author:{type:String,
            required:[true,"book author is required"],
                trim:true,
                    maxLenght:[50,"book author should not exceed 50 characters"]},
year:{type:Number,
        required:[true,"book year is required"],
            min:[1500,"book year should not be less than 1500"],
                max:[new Date().getFullYear(),"book year can not be in the future"]},
createdAt:{type:Date
            ,default:Date.now} 
})

const Book=mongoose.model("Book",bookSchema)
module.exports=Book