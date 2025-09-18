const express=  require("express")
const router=express.Router()


const userController=require("../controllers/userController.js")

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.post("/home",userController.loginAuth,(req,res)=>{
    console.log(req.user);
    res.status(200).json({message:"home page",req:req.user})
})

router.post("/admin",userController.loginAuth,userController.adminAuth,(req,res)=>{
    res.status(200).json({message:"admin page"})
}
)


router.post("/changePassword",userController.loginAuth,userController.changePassword)



module.exports=router