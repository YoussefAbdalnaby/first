const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../database/user.js');
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        const user=await User.findOne({email:email})
        if(user) return res.status(400).json({message:"email already registered"})
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            let user = new User(req.body); // Use let if you plan to reassign
            user.password = hashedPassword;
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
    
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user=req.body;
        const foundUser=await User.findOne({email:user.email});
        if(!foundUser) return res.status(400).json({message:"user not found"})

        const isPassswordVaild= await bcrypt.compare(user.password,foundUser.password);
        if(!isPassswordVaild) return res.status(400).json({message:"invalid password"})
        const accsessToken=jwt.sign({id:foundUser._id,name:foundUser.name,role:foundUser.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        const authHeader = req.headers['authorization'];
        console.log(process.env.CLOUDINARY_API_KEY); // Should print your API key
        res.status(200).json({ message: "login successfull", token: accsessToken });


    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }

}

exports.loginAuth=async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1];
        if(!token) return res.status(401).json({message:"access denied not token provided"})
        const verified=jwt.verify(token,process.env.JWT_SECRET)
        if(!verified) return res.status(401).json({message:"token not vaild not verified"})
        console.log(verified.role);
        req.user=verified  
          
    next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.adminAuth=(req,res,next)=>{
    try {
        if(req.user.role!=="admin") return res.status(401).json({message:"access denied not admin"})
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.changePassword=async(req,res)=>{
    try {
        const userId=req.user.id    
        const {oldPassword,newPassword}=req.body
        const user=await User.findById(userId)
        if(!user) return res.status(400).json({message:"user not found"})
        const isPassswordVaild= await bcrypt.compare(oldPassword,user.password);
        if(!isPassswordVaild) return res.status(400).json({message:"invalid password"})
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password=hashedPassword
        await user.save()
        res.status(200).json({message:"password changed successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

