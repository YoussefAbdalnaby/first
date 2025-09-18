const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50
    },  
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})  


const User=mongoose.model('User',userSchema)

module.exports=User