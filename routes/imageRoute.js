const authmiddleware=require("../controllers/userController.js")
const uploadImageMiddleware=require("../middlewares/imageMiddleware.js")
const imageController=require("../controllers/imageController.js")
const express=require("express")
const router=express.Router()

router.post("/upload",authmiddleware.loginAuth,
uploadImageMiddleware.single("image"),
imageController.uploadImage)


router.post("/get",authmiddleware.loginAuth,

imageController.getImages)

router.delete("/delete/:id", authmiddleware.loginAuth, imageController.deleteFromCloudinary)



module.exports=router